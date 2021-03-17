import React from 'react';

// handle the breadcrums section
class Breadcrums extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="left-outer-head">
                <ul className="breadcrums">
                    <li>
                        <a href="/dashboard">Dashboard </a>
                    </li>
                    <li>
                        <a href="/dashboard">{this.props.mainSection} </a>
                    </li>
                    <li className="active">
                        <a href="javascript:void(0);">{this.props.activeSection} </a>
                    </li>
                </ul>
                <h2 className="card-title">{this.props.title}</h2>
            </div>
        )
    }
}

export default Breadcrums;