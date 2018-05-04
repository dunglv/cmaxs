#!/bin/sh
# startup.sh
/usr/bin/supervisord
supervisord -c /etc/supervisor/supervisord.conf
supervisorctl -c /etc/supervisor/supervisord.conf
