/**************************************************
 *  Copyright (c) 2014 AnsibleWorks, Inc.
 *
 *  Socket.js
 *
 *  Wrapper for lib/socket.io-client/dist/socket.io.js.
 */

/* global io */

'use strict';

angular.module('SocketIO', ['AuthService', 'Utilities'])

    .factory('Socket', ['$rootScope', '$location', '$log', 'Authorization', 'Alert', function ($rootScope, $location, $log, Authorization, Alert) {
        return function(params) {
            var scope = params.scope,
                host = $location.host(),
                endpoint = params.endpoint,
                protocol = $location.protocol(),
                url = protocol + '://' + host + ':8080/socket.io/' + endpoint;

            if (scope.removeSocketErrorEncountered) {
                scope.removeSocketErrorEncountered();
            }
            scope.removeSocketErrorEncountered = scope.$on('SocketErrorEncountered', function(e, reason) {
                if (reason === 'Session expired') {
                    // encountered expired token, ask user to log in again
                    $rootScope.sessionTimer.expireSession();
                    $location.url('/login');
                }
                else if (scope.socketStatus === 'error') {
                    Alert("Connection Error", "Error encountered while attempting to connect to the websocket server. Confirm the server " +
                        "is up. Use the <i class=\"fa fa-power-off\"></i> button found on the Inventories, Projects and Jobs pages to reconnect.",
                        "alert-danger");
                }
            });

            return {
                scope: scope,
                url:  url,
                socket: null,
                init: function() {
                    var self = this,
                        token = Authorization.getToken();
                    if (!$rootScope.sessionTimer.isExpired()) {
                        // We have a valid session token, so attmempt socket connection
                        $log.debug('Socket connecting to: ' + url);
                        self.scope.socket_url = url;
                        self.socket = io.connect(url, { headers:
                            {
                                'Authorization': 'Token ' + token,
                                'X-Auth-Token': 'Token ' + token
                            },
                            'connect timeout': 3000,
                            'try multiple transports': false,
                            'max reconneciton attemps': 3,
                            'reconnection limit': 3000,
                        });
                        self.socket.on('connection', function() {
                            $log.debug('Socket connecting...');
                            self.scope.$apply(function () {
                                self.scope.socketStatus = 'connecting';
                                self.scope.socketTip = 'Connecting. Click to cancel.';
                            });
                        });
                        self.socket.on('connect', function() {
                            $log.debug('Socket connection established');
                            self.scope.$apply(function () {
                                self.scope.socketStatus = 'ok';
                                self.scope.socketTip = 'Connected. Click to close.';
                            });
                        });
                        self.socket.on('connect_failed', function(reason) {
                            var r = reason || 'connection refused by host';
                            $log.error('Socket connection failed: ' + r);
                            self.scope.$apply(function () {
                                self.scope.socketStatus = 'error';
                                self.scope.socketTip = 'Connection failed. Click to retry.';
                                self.scope.$emit('SocketErrorEncountered');
                            });

                        });
                        self.socket.on('diconnect', function() {
                            $log.debug('Socket disconnected');
                            self.scope.$apply(function() {
                                self.socketStatus = 'error';
                                self.socketTip = 'Disconnected. Click to connect.';
                                self.scope.$emit('SocketErrorEncountered');
                            });
                        });
                        self.socket.on('error', function(reason) {
                            var r = reason || 'connection refused by host';
                            $log.debug('Socket error: ' + r);
                            self.scope.$apply(function() {
                                self.scope.socketStatus = 'error';
                                self.scope.socketTip = 'Connection error encountered. Click to retry.';
                                self.scope.$emit('SocketErrorEncountered');
                            });
                        });
                        self.socket.on('reconnecting', function() {
                            $log.debug('Socket attempting reconnect...');
                            self.scope.$apply(function() {
                                self.scope.socketStatus = 'connecting';
                                self.scope.socketTip = 'Connecting. Click to cancel.';
                            });
                        });
                        self.socket.on('reconnect', function() {
                            $log.debug('Socket reconnected');
                            self.scope.$apply(function() {
                                self.scope.socketStatus = 'ok';
                                self.scope.socketTip = 'Connected. Click to close.';
                            });
                        });
                        self.socket.on('reconnect_failed', function(reason) {
                            $log.error('Socket reconnect failed: ' + reason);
                            self.scope.$apply(function() {
                                self.scope.socketStatus = 'error';
                                self.scope.socketTip = 'Connection failed. Click to retry.';
                                self.scope.$emit('SocketErrorEncountered');
                            });
                        });
                    }
                    else {
                        // Encountered expired token
                        self.scope.$emit('SocketErrorEncountered', 'Session expired');
                    }
                },
                checkStatus: function() {
                    // Check connection status
                    var self = this;
                    if (self.socket.socket.connected) {
                        $log.debug('Socket connected');
                        self.scope.socketStatus = 'ok';
                        self.scope.socketTip = 'Connected. Click to close.';
                    }
                    else if (self.socket.socket.connecting || self.socket.socket.reconnecting) {
                        $log.debug('Socket connecting...');
                        self.scope.socketStatus = 'connecting';
                        self.scope.socketTip = 'Connecting. Click to cancel.';
                    }
                    else {
                        $log.debug('Socket error: connection refused');
                        self.scope.socketStatus = 'error';
                        self.scope.socketTip = 'Connection failed. Click to retry';
                    }
                    return self.scope.socketStatus;
                },
                on: function (eventName, callback) {
                    var self = this;
                    self.socket.on(eventName, function () {
                        var args = arguments;
                        self.scope.$apply(function () {
                            callback.apply(self.socket, args);
                        });
                    });
                },
                emit: function (eventName, data, callback) {
                    var self = this;
                    self.socket.emit(eventName, data, function () {
                        var args = arguments;
                        self.scope.$apply(function () {
                            if (callback) {
                                callback.apply(self.socket, args);
                            }
                        });
                    });
                }
            };
        };
    }]);
