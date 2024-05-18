#!/bin/bash

# https://api.openbooking.ch/swagger/
# https://chalet.myswitzerland.com/ferienwohnung/marmorera/tga-christoffel-323549/
# https://www.valsurses.ch/de/webshop-unterkuenfte#/unterkuenfte/CH1/c0195db2-2db6-47d5-9453-414a27e7d694/tga-christoffel-

get_openbooking() {

  local ob_auth_token

  ob_auth_token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"
  ob_auth_token+=".eyJpZCI6IjU3N2E3NjIyZDBhNThjMGIwMGI3YTc0YiIsImdyb3VwIjoiNTc1YWQ0ZG"
  ob_auth_token+="ZlOWRhNjMzZDI2Y2E3MmM0Iiwic2NvcGVzIjpbIm1hc3RlciJdLCJpYXQiOjE0NzE5NjM1ODd9"
  ob_auth_token+=".LK7Vcif2BbjyGAl06xeT6M3ZKyvLpixW2mBlAQTviPI"

  curl -gs -H "Authorization: Bearer $ob_auth_token" \
     https://api.openbooking.ch/availabilities/2fa6bf5ab6104e5e9a63bb1f2bbe40fa
}

get_myswitzerland() {
  curl -gs https://chalet.myswitzerland.com/ferienwohnung/marmorera/tga-christoffel-323549/ |
          sed -n '/availability[[:space:]]*=[[:space:]]*{.*2fa6bf5ab6104e5e9a63bb1f2bbe40fa/s/^[^{]*\({.*}\).*/[\1]/p'
}

get_deskline() {
  ## !!! ANDERES FORMAT !!! ##
  curl --silent -H 'DW-Source: desklineweb' -H 'DW-SessionId: Y1716036959516' \
    --get https://webapi.deskline.net/savognin/de/accommodations/CH1/products/bb3b5913-07a0-4893-88c5-6a1d52278ea5 \
    --data 'currency=CHF' --data 'spId=c0195db2-2db6-47d5-9453-414a27e7d694' \
    --data-urlencode 'fields=availabilityCalendar(fromDate:"2024-3-31",toDate:"2024-7-31"){date,available,canArrive,canDepart,minStay,maxStay,stayInterval}'
}

assert_valid() {
     python3 -c 'import sys, json; buf = sys.stdin.read(); data = json.loads(buf); \
                 sys.stdout.write(buf) if data[0]["free"][0] < 991231 else sys.stderr.write("unsupported response data\n")'
}

get_openbooking | assert_valid
