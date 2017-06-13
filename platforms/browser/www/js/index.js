/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License") you may not use this file except in compliance
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
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready')
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {

        const makeXMLHttpRequest = (method, url) => {
            return new Promise((resolve, reject) => {
                const req = new XMLHttpRequest()
                req.open(method, url, true)
                req.onload = (e) => {
                    if (req.readyState === 4) {
                        if (req.status === 200) {
                            return resolve(req)
                        } else {
                            return reject(req.statusText)
                        }
                    }
                }
                req.onerror = (e) => {
                    return reject(req.statusText)
                }
                req.send(null)
            })
        }

        const getRow = (obj) => {
            return `<tr>
                <td>${obj.id}</td>
                <td>${obj.title}</td>
                <td>${obj.content}</td>
                <td>${obj.createDate}</td>
                <td>${obj.type}</td>
            </tr>`

        }

        const getData = async () => {
            const tbody = document.querySelector('#table tbody')

            const requestJson = await makeXMLHttpRequest('GET', 'https://fun-grabber.azurewebsites.net/news_list.json')
            console.log(requestJson.responseText)

            const data = JSON.parse(requestJson.responseText)
            const rows = data.map(getRow)

            tbody.innerHTML = rows.join('')

        }

        document.querySelector('#get-data').addEventListener('click', getData)

    }
}

app.initialize()