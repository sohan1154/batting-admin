import React from 'react';
import * as SiteSettings from '../../providers/settings/settings';
import * as GlobalConfig from '../../providers/globals/config';

// handle the footer section
class Footer extends React.Component {
   
    render() {
        return (
            <div className="copyfootbar">
                <img className="logo-img" src="images/logo.png" alt={GlobalConfig.appName} />
                <p>&copy; {SiteSettings.copyrightYear} {GlobalConfig.appName}</p>
            </div>
        )
    }
}


export default Footer;