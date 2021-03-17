import React from 'react';
import * as SiteSettings from '../../providers/settings/settings';

// handle the footer section
class Footer extends React.Component {

    render() {
        return (
            <div className="timcopyfootbar">
                <img className="dekhadatalogo" src="images/dekhadetalogo.png" alt="Dekha Data" />
                <p>&copy; {SiteSettings.copyrightYear} {SiteSettings.appName}</p>
            </div>
        )
    }
}

export default Footer;