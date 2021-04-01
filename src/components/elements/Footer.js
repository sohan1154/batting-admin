import React from 'react';
import * as SiteSettings from '../../providers/settings/settings';

// handle the footer section
class Footer extends React.Component {
   
    render() {
        return (
            <div className="copyfootbar">
                <img className="logo-img" src="images/logo.png" alt={SiteSettings.appName} />
                <p>&copy; {SiteSettings.copyrightYear} {SiteSettings.appName}</p>
            </div>
        )
    }
}


export default Footer;