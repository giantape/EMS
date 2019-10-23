import React from 'react'
import axios from "axios";

const UserAction = {
    AddNewUser: function(newData){
        axios.post('/user', {
            newData
        }).then(function (response) {
            response.data
            //console.log('response', response)
        }).catch(function (error) {
            //console.log('error', error)
            return error
        });
    },

    UpdateUser: function(newData){
        axios.put(`/user/${newData._id}`, {
            newData
        }).then(function (response) {
            response.data
        }).catch(function (error) {
            error
        });
    },

    DeleteUser: function(currentData){
        axios.delete(`/user/${currentData}`, {
            currentData
        }).then(function (response) {
            response.data
        })
    }
}

module.exports = UserAction