import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download(url, filename, referer=None):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    if referer:
        headers['Referer'] = referer
    
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            with open(filename, 'wb') as f:
                f.write(response.read())
        print(f"Success: {url} -> {filename}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

# ANI
download("https://upload.wikimedia.org/wikipedia/commons/f/f3/Ani-logo.png", "/Users/apple/Biolabs/t-core/public/logo_ani.png")

# ThePrint
download("https://upload.wikimedia.org/wikipedia/commons/2/2a/ThePrint_logo.png", "/Users/apple/Biolabs/t-core/public/logo_theprint.png")

# The Tribune
download("https://img.cdn.sortd.mobi/thetribune-sortd-pro-prod-sortd/header_branding:brand_logoc280b980-3893-11f1-8e55-05ac9910cb0c", "/Users/apple/Biolabs/t-core/public/logo_tribune.png")

# India CSR
download("https://indiacsr.in/wp-content/uploads/2022/01/India-CSR-Logo.png", "/Users/apple/Biolabs/t-core/public/logo_indiacsr.png", referer="https://indiacsr.in/")

# Business News This Week
download("https://businessnewsthisweek.com/wp-content/uploads/2019/11/logo.png", "/Users/apple/Biolabs/t-core/public/logo_businessnews.png", referer="https://businessnewsthisweek.com/")
