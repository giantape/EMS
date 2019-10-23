import React, { Component } from 'react';
import MaterialTable from 'material-table';
//  import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import UserAction from './actions';
import _ from 'underscore'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

class UserTable extends Component {
    _isMounted = false;
    state = {
        columns:
            [
                { title: 'Vorname', field: 'first_name', type: 'string', searchable: false },
                { title: 'Nachname', field: 'last_name', type: 'string', searchable: true },
                { title: 'Geschlecht', field: 'gender', type: 'string', searchable: false },
                { title: 'Straße', field: 'adress', type: 'string', searchable: false },
                { title: 'PLZ', field: 'zipcode', type: 'string', searchable: false },
                { title: 'Ort', field: 'city', type: 'string', searchable: false }
            ],
        data: []
    }


    componentDidMount() {
        this._isMounted = true;
        axios.get('/user')
            .then(res => {
                const data = res.data;
                //this.setState({ data });
                if (this._isMounted) {
                    this.setState({ data });
                }

            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { columns, data } = this.state

        return (
            <MaterialTable
                columns={columns}
                data={data}
                options={{
                    actionsColumnIndex: -1,
                    showTitle: false
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                /* Todo: Better way to validate fields
                                *  this is only the simple way to validate field
                                *  much better to see if the newData has an attributes with:
                                *  _.each(columns, function(val){
                                        and see if newData has attributes:
                                        _.has(newData, val.field)
                                        this will return true or false
                                })
                                */
                                const Message = withReactContent(Swal)
                                if (Object.keys(newData).length < columns.length) {
                                    reject()
                                    Message.fire({
                                        type: 'warning',
                                        title: 'Fehler!',
                                        text: 'Die Angegebenen felder sind pflicht felder',
                                        dangerMode: true
                                    })
                                } else {
                                    resolve();
                                    const data = [...this.state.data];
                                    UserAction.AddNewUser(newData)
                                    data.push(newData);
                                    this.setState({ ...this.state, data });
                                    Message.fire({
                                        type: 'success',
                                        title: 'Gut Gemacht!',
                                        text: 'Ihre Eintrag würde erfolgreich gespeichert!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const Message = withReactContent(Swal)
                                if (_.isEmpty(newData.first_name) || _.isEmpty(newData.last_name) || _.isEmpty(newData.gender) || _.isEmpty(newData.adress) || _.isEmpty(newData.zipcode) || _.isEmpty(newData.city)) {
                                    reject()
                                    Message.fire({
                                        type: 'warning',
                                        title: 'Fehler!',
                                        text: 'Die Angegebenen felder sind pflicht felder',
                                        dangerMode: true
                                    })
                                } else {
                                    resolve();
                                    const data = [...this.state.data];
                                    UserAction.UpdateUser(newData)
                                    data[data.indexOf(oldData)] = newData;
                                    this.setState({ ...this.state, data });
                                    Message.fire({
                                        type: 'success',
                                        title: 'Gut Gemacht!',
                                        text: 'Ihre Eintrag würde erfolgreich gespeichert!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                UserAction.DeleteUser(oldData._id)
                                const data = [...this.state.data];
                                data.splice(data.indexOf(oldData), 1);
                                this.setState({ ...this.state, data });
                            }, 600);
                        }),
                }}
            />
        );
    }
}
export default UserTable;