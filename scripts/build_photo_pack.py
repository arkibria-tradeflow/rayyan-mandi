#!/usr/bin/env python3
"""Build curated Wikimedia Commons photos as local WebP files for Rayyan's demo."""
import csv, hashlib, io, json, pathlib, time, urllib.parse, zipfile
import requests
from PIL import Image, ImageOps
ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=ROOT/"assets"/"menu"
OUT.mkdir(parents=True,exist_ok=True)
SOURCE=json.loads((ROOT/"data/photo-sources.json").read_text(encoding="utf-8"))
session=requests.Session()
session.headers.update({"User-Agent":"RayyanMandi-Demo-Media/1.0 (Commons attribution image preparation, contact via GitHub issue)"})
def download(name):
    filename=name.replace(" ","_")
    digest=hashlib.md5(filename.encode()).hexdigest()
    q=urllib.parse.quote(filename,safe="()")
    root="https://upload.wikimedia.org/wikipedia/commons/thumb/"+digest[0]+"/"+digest[:2]+"/"+q
    # Wikimedia explicitly recommends generated thumbnails rather than original files for automation.
    choices=[root+"/500px-"+q,root+"/330px-"+q]
    last=None
    for url in choices:
        for attempt in range(2):
            try:
                response=session.get(url,timeout=18)
                response.raise_for_status()
                if len(response.content)<4500:raise ValueError("small image response")
                with Image.open(io.BytesIO(response.content)) as image:image.verify()
                time.sleep(12)
                return response.content
            except Exception as exc:
                last=exc
                print("Retry thumbnail",name,str(exc)[:120],flush=True)
                time.sleep(45 if "429" in str(exc) else 2+attempt)
    raise RuntimeError(str(last))

def webp(data,path):
    with Image.open(io.BytesIO(data)) as im:
        im=ImageOps.exif_transpose(im).convert("RGB")
        im=ImageOps.fit(im,(650,530),method=Image.Resampling.LANCZOS,centering=(0.5,0.46))
        im.save(path,"WEBP",quality=82,method=5)
    if path.stat().st_size<8000:raise ValueError("Invalid WebP file")
def main():
    ok=[];fail=[]
    for entry in SOURCE:
        dest=OUT/(entry["slug"]+".webp")
        try:
            webp(download(entry["source"]),dest);ok.append(entry)
            print("OK",dest.relative_to(ROOT),dest.stat().st_size,flush=True)
        except Exception as exc:
            fail.append((entry["slug"],str(exc)));dest.unlink(missing_ok=True)
            print("FAILED",entry["slug"],str(exc),flush=True)
    if len(ok)<4:raise RuntimeError("Insufficient downloaded photos: "+str(fail))
    with (ROOT/"data/photo-credits.csv").open("w",newline="",encoding="utf-8") as f:
        w=csv.writer(f);w.writerow(["Image file","Subject","Author","License","Original source","Modification","Status"])
        for p in ok:w.writerow(["assets/menu/"+p["slug"]+".webp",p["subject"],p["author"],p["license"],p["source_page"],"Resized and cropped","Illustrative; not photographed at Rayyan"])
    ids={
    "extra0":"mutton-mandi-alt","extra1":"mutton-shank","extra2":"mutton-haneeth","extra3":"mutton-mandi-alt","extra4":"mutton-shank",
    "extra5":"chicken-mandi","extra6":"chicken-madbee","extra7":"chicken-mandi","extra8":"chicken-madbee","extra9":"chicken-curry","extra10":"chicken-mandi","extra11":"chicken-curry",
    "extra12":"mutton-haneeth","extra13":"haneeth-traditional","extra14":"haneeth-traditional","extra15":"mutton-shank",
    "extra16":"fish-grilled","extra17":"fish-plated","extra18":"fish-alt","extra19":"fish-plated","extra20":"prawns-grilled",
    "extra21":"rice-mandi","extra22":"rice-spiced","extra23":"rice-spiced",
    "extra24":"salad-arabic","extra25":"salad-arabic","extra26":"salad-fattoush","extra27":"salad-arabic","extra28":"tomato-sauce","extra29":"salad-fattoush",
    "extra30":"dessert-kunafa","extra31":"dessert-luqaimat",
    "madfoon":"mutton-mandi-alt","madghout":"mutton-shank"
    }
    valid={p["slug"] for p in ok}
    mapping={k:"assets/menu/"+v+".webp" for k,v in ids.items() if v in valid}
    (ROOT/"data/photo-mapping.json").write_text(json.dumps(mapping,indent=2)+"\n",encoding="utf-8")
    (ROOT/"rayyan-image-map.js").write_text("/* Illustrative dish photos, not restaurant photography. */\nwindow.RayyanPhotoMap="+json.dumps(mapping,ensure_ascii=False)+";\n",encoding="utf-8")
    with (ROOT/"data/dish-image-mapping.csv").open("w",newline="",encoding="utf-8") as f:
        w=csv.writer(f);w.writerow(["Menu item ID","Image path","Photo","Use"])
        for key,val in mapping.items():w.writerow([key,val,pathlib.Path(val).stem,"Representative photo"])
    readme="# Rayyan Mandi dish photography\n\nThis image pack includes real online photos of similar food, not real Rayyan product photography. It is intended for the client demo only. Original mutton feature photos remain unchanged.\n\nExtract the archive to the repository root to preserve the assets/menu folder. Uploading a ZIP to GitHub as a file does not extract or display those images automatically.\n\nSee data/dish-image-mapping.csv for menu IDs and data/photo-credits.csv for attribution and license links. Respect the specified BY and SA conditions for attribution and derivative image use. All images were resized and cropped.\n"
    (ROOT/"PHOTO_PACKAGE_README.md").write_text(readme,encoding="utf-8")
    dest=ROOT/"Rayyan_Mandi_Dish_Photos.zip"
    with zipfile.ZipFile(dest,"w",compression=zipfile.ZIP_DEFLATED,compresslevel=8) as z:
        for p in sorted(OUT.glob("*.webp")):z.write(p,p.relative_to(ROOT))
        for p in ["data/photo-credits.csv","data/dish-image-mapping.csv","data/photo-mapping.json","rayyan-image-map.js","PHOTO_PACKAGE_README.md"]:
            z.write(ROOT/p,p)
    print("SUCCESS:",len(ok),"photos;",len(mapping),"dish assignments;",dest.stat().st_size,"bytes",flush=True)
    if fail:print("MISSING",fail,flush=True)
if __name__=="__main__":main()
