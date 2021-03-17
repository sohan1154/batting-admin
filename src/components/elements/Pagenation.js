import React from 'react';
import * as SiteSettings from '../../providers/settings/settings';

// handle the pagenation section
class Pagenation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let total = (this.props.total <= SiteSettings.perPage) ? this.props.total : 0;

        return (
            <div className="pagenation-foot d-flex align-items-center justify-content-between">
                <div className="itempagetotal">items per page : <span>{SiteSettings.perPage}</span></div>
                <div className="countingpaging">
                    <a href="javascript:void(0);" id="page-prev" className="arrowspaging prev"> <i className="icon-09"></i> </a>
                    <div className="totlecountpage"> <span id="displayed-record">{total}</span> of {total}</div>
                    <a href="javascript:void(0);" id="page-next" className="arrowspaging next"> <i className="icon-08"></i> </a>
                </div>
            </div>
        )
    }
}

export default Pagenation;