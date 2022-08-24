var axios = require('axios');
const fs = require('fs');
const path = require('path');

const d = new Date();
let dateTime = d.toISOString();
const hostname = 'http://localhost:3000'


exports.getSitemapTermLists = (req, res) => {
    const reqOne = axios.get('http://localhost:5000/api/sitemap/post');
    const reqTwo = axios.get('http://localhost:5000/api/sitemap/term');

    axios.all([reqOne, reqTwo]).then(axios.spread((...responses) => {
        const responseOne = responses[0].data
        const responseTwo = responses[1].data
        var post = responseOne.map((curValue) => {
            return `<url>
                    <loc>${hostname}/${curValue.PostSlug}</loc>
                    <lastmod>${dateTime}</lastmod>
                    <priority>0.64</priority>
                </url>`
        })
        var category = responseTwo.map((curValue) => {
            return `<url>
                    <loc>${hostname}/category/${curValue.TermSlug}</loc>
                    <lastmod>${dateTime}</lastmod>
                    <priority>0.80</priority>
                   </url>`
        })

        // Content

        const fileHeader = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

        const fileOrign = ` 
                        <url>
                            <loc>${hostname}</loc>
                            <lastmod>${dateTime}</lastmod>
                            <priority>1.0</priority>
                        </url> `;

        const fileCat = category

        const filePost = post

        const fileFooter = `</urlset>`;

        const sitemapData = fileHeader + fileOrign + fileCat + filePost + fileFooter

        const orginalSitemapData = sitemapData.replaceAll(',', '')

        // File Work
        fs.writeFile('sitemap.xml', orginalSitemapData, err => {
            if (err) {
                console.error(err);
            }
        });

        const filepath = path.join(__dirname, '../../sitemap.xml')
        // sending file
        // res.sendFile(filepath)

            var stat = fs.statSync(filepath);
        
            res.writeHead(200, {
                'Content-Type': 'application/xml',
                'Content-Length': stat.size
            });
        
            var readStream = fs.createReadStream(filepath);
            // We replaced all the event handlers with a simple call to readStream.pipe()
            readStream.pipe(res);

    }))

}
