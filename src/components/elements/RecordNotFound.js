import React from 'react';

// handle no record found section
class RecordNotFound extends React.Component {

    render() {

        return (
            <div className="container  pull-up">
                <div className="row">
                    <div className="col-12">
                        <div className="card">

                            <div className="card-body">
                                <div className="table-responsive p-t-10">
                                    <table id="example-height" className="table" style={{ width: "100%" }}>
                                        <tr>
                                            <td>Record not found</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecordNotFound;