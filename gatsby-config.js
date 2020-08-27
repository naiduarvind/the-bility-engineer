module.exports = {
    pathPrefix: '/',
    siteMetadata: require('./site-metadata.json'),
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-source-data`,
        `gatsby-plugin-twitter`,
        `gatsby-remark-embed-video`,
        `gatsby-remark-responsive-iframe`,
        `gatsby-remark-images`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`,
            },
        },
        {
            resolve: `gatsby-plugin-stackbit-static-sass`,
            options: {
                inputFile: `${__dirname}/src/sass/main.scss`,
                outputFile: `${__dirname}/public/assets/css/main.css`
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [`gatsby-remark-component`]
            }
        },
        {
            resolve: `gatsby-remark-page-creator`,
            options: {
                
            }
        },
        {
            resolve: `@stackbit/gatsby-plugin-menus`,
            options: {
                sourceUrlPath: `fields.url`,
                pageContextProperty: `menus`,
            }
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
              plugins: [
              {
                resolve: "gatsby-remark-embed-video",
                options: {
                  width: 800,
                  ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                  height: 400, // Optional: Overrides optional.ratio
                  related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
                  noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
                  urlOverrides: [
                    {
                      id: 'youtube',
                      embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                    }
                  ]
                }
              }
              ]
            }
        }
    ]
};
