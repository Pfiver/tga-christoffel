#!/bin/bash

# https://api.openbooking.ch/swagger/
# https://chalet.myswitzerland.com/ferienwohnung/marmorera/tga-christoffel-323549/

auth_token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"
auth_token+=".eyJpZCI6IjU3N2E3NjIyZDBhNThjMGIwMGI3YTc0YiIsImdyb3VwIjoiNTc1YWQ0ZG"
auth_token+="ZlOWRhNjMzZDI2Y2E3MmM0Iiwic2NvcGVzIjpbIm1hc3RlciJdLCJpYXQiOjE0NzE5NjM1ODd9"
auth_token+=".LK7Vcif2BbjyGAl06xeT6M3ZKyvLpixW2mBlAQTviPI"

curl -gs -H "Authorization: Bearer $auth_token" \
    https://api.openbooking.ch/availabilities/2fa6bf5ab6104e5e9a63bb1f2bbe40fa |
    python3 -c 'import sys, json; buf = sys.stdin.read(); data = json.loads(buf); \
                sys.stdout.write(buf) if data[0]["free"][0] < 991231 else sys.stderr.write("unsupported response data\n")'
