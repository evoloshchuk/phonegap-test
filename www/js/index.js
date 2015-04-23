/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        app.getContacts();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    },
    getContacts: function() {
        obj = new ContactFindOptions(); 
        obj.filter = ""; 
        obj.multiple = true; 
        obj.limit = 1000;
        navigator.contacts.find( ["displayName", "name", "phoneNumbers"], 
            function(contacts) {
                data = [];
                var s = ""; 
                if (contacts.length == 0) { 
                    s = "No contacts found"; 
                } 
                else { 
                    s = "Number of contacts: "+contacts.length+"<br><table width='100%' border='1'><tr><th>Name</th><td>Phone</td></tr>"; 
                    for (var i=0; i<contacts.length; i++) { 
                        var contact = contacts[i];
                        data.push({id: contact.phoneNumbers[0].value, text: contact.name.formatted}); 
                        s = s + "<tr><td>" + contact.name.formatted + "</td><td>"; 
                        if (contact.phoneNumbers.length > 0) { 
                            s = s + contact.phoneNumbers[0].value; 
                        } 
                        s = s + "</td></tr>"; 
                    } 
                    s = s + "</table>"; 
                }
                $("#contacts_list").select2({multiple: true, data: data});
                // document.getElementById('contacts_list').innerHTML = s; 
            }, 
            function(e) { 
                document.getElementById('contacts_list').innerHTML = "Error: "+e; 
            }, 
            obj
        );
    } 
};
