import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import {safePrefix} from '../utils';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    {/* <!-- Primary Meta Tags --> */}
                    <title>{_.get(this.props, 'pageContext.frontmatter.title') && _.get(this.props, 'pageContext.frontmatter.title') + ' - '}{_.get(this.props, 'pageContext.site.siteMetadata.title')}</title>
                    <meta name="title" content={_.get(this.props, 'pageContext.frontmatter.title') || _.get(this.props, 'pageContext.site.siteMetadata.title')} />
                    <meta name="description" content={_.get(this.props, 'pageContext.frontmatter.excerpt') || _.get(this.props, 'pageContext.site.siteMetadata.description')} />
                    
                    {/* <!-- Open Graph / Facebook --> */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={_.get(this.props, 'pageContext.frontmatter.canonical_url') || _.get(this.props, 'pageContext.site.siteMetadata.siteUrl')} />
                    <meta property="og:title" content={_.get(this.props, 'pageContext.frontmatter.title') || _.get(this.props, 'pageContext.site.siteMetadata.title')} />
                    <meta property="og:description" content={_.get(this.props, 'pageContext.frontmatter.excerpt') || _.get(this.props, 'pageContext.site.siteMetadata.description')} />
                    <meta property="og:image" content={_.get(this.props, 'pageContext.site.siteMetadata.siteUrl') + _.get(this.props, 'pageContext.frontmatter.thumb_img_path')} />

                    {/* <!-- Twitter --> */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:url" content={_.get(this.props, 'pageContext.frontmatter.canonical_url') || _.get(this.props, 'pageContext.site.siteMetadata.siteUrl')} />
                    <meta name="twitter:title" content={_.get(this.props, 'pageContext.frontmatter.title') || _.get(this.props, 'pageContext.site.siteMetadata.title')} />
                    <meta name="twitter:description" content={_.get(this.props, 'pageContext.frontmatter.excerpt') || _.get(this.props, 'pageContext.site.siteMetadata.description')} />
                    <meta name="twitter:image" content={_.get(this.props, 'pageContext.site.siteMetadata.siteUrl') + _.get(this.props, 'pageContext.frontmatter.thumb_img_path')}/>
                    
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&display=swap" rel="stylesheet"/> 
                    <link rel="stylesheet" href={safePrefix('assets/css/main.css')}/>
                    <link rel="stylesheet" href={safePrefix('assets/css/main.css')}/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png"/>
                    <link rel="manifest" href="/images/favicon/site.webmanifest"></link>
                    {(_.get(this.props, 'pageContext.frontmatter.template') === 'post') &&  
                    _.get(this.props, 'pageContext.frontmatter.canonical_url') && 
                    <link rel="canonical" href={_.get(this.props, 'pageContext.frontmatter.canonical_url')}/>
                    }
                </Helmet>
                <div id="page" className={'site style-' + _.get(this.props, 'pageContext.site.siteMetadata.layout_style') + ' palette-' + _.get(this.props, 'pageContext.site.siteMetadata.palette')}>
                  <Header {...this.props} />
                  <div id="content" className="site-content">
                    <div className="inner">
                      <main id="main" className="site-main">
                        {this.props.children}
                      </main>
                      <Footer {...this.props} />
                    </div>
                  </div>
                </div>
            </React.Fragment>
        );
    }
}