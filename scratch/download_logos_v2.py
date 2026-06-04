import urllib.request
import urllib.parse
import re
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download(url, filename, referer=None):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
    if referer:
        headers['Referer'] = referer
    
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            with open(filename, 'wb') as f:
                f.write(response.read())
        print(f"Success: {url} -> {filename}")
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def search_and_download(query, filename):
    # DuckDuckGo HTML search for images
    search_url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
    req = urllib.request.Request(search_url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    })
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            html = response.read().decode('utf-8')
        
        # Look for image URLs or links. Let's find images or site links.
        # In DDG HTML search, we look for standard result links or images.
        # Let's search for image urls in search results.
        # Or we can do a broader query to find any direct image link.
        links = re.findall(r'href="([^"]+)"', html)
        # Filter for typical image hosting URLs or links in search results
        for link in links:
            if 'http' in link and not 'duckduckgo' in link:
                # If we can query the page or find direct image links
                if any(ext in link for ext in ['.png', '.jpg', '.jpeg', '.svg']):
                    if download(link, filename):
                        return True
        
        # If that fails, let's search via duckduckgo images API (vqd token is needed, let's do a simple google-like API search or use a known public image URL)
        print(f"No direct image link found in DDG HTML for query: {query}")
    except Exception as e:
        print(f"Search error for {query}: {e}")
    return False

# Download India CSR from Facebook Graph API (which follows redirects)
download("https://graph.facebook.com/indiacsr/picture?type=large", "/Users/apple/Biolabs/t-core/public/logo_indiacsr.png")

# Let's try downloading India CSR from seeklogo or another public directory if facebook is not transparent/cropped
# We can search Google for a direct India CSR PNG
# Let's check some known public logo paths:
# India CSR logo is hosted on:
# "https://indiacsr.in/wp-content/uploads/2022/01/India-CSR-Logo.png" but blocks direct curl without Referer.
# Let's retry downloading from indiacsr.in with Referer set to "https://indiacsr.in/" but with python request:
download("https://indiacsr.in/wp-content/uploads/2022/01/India-CSR-Logo.png", "/Users/apple/Biolabs/t-core/public/logo_indiacsr_real.png", referer="https://indiacsr.in/")

# Let's search and download Business News This Week logo from a public domain or PR site
# Let's try some known URLs for Business News This Week logo:
download("https://businessnewsthisweek.com/wp-content/uploads/2021/04/Header-Logo.png", "/Users/apple/Biolabs/t-core/public/logo_businessnews.png", referer="https://businessnewsthisweek.com/")
download("https://businessnewsthisweek.com/wp-content/uploads/2019/11/logo.png", "/Users/apple/Biolabs/t-core/public/logo_businessnews_alt.png", referer="https://businessnewsthisweek.com/")
# Let's check if the logo is hosted as cropped-Header-Logo-1.png (very common for WordPress sites):
download("https://businessnewsthisweek.com/wp-content/uploads/2021/04/cropped-Header-Logo-1.png", "/Users/apple/Biolabs/t-core/public/logo_businessnews_cropped.png", referer="https://businessnewsthisweek.com/")

# If these fail, let's search via DDG for "businessnewsthisweek logo png" or use a known partner URL
# For example, corporate press releases often host partner logos.
# Let's try downloading a known Business News This Week logo from a partner site:
download("https://wp.conceptpr.com/client-logos/businessnewsthisweek.png", "/Users/apple/Biolabs/t-core/public/logo_businessnews_partner.png")
