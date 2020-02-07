#!/usr/bin/python

import os
import urllib3
import certifi
import lxml.html
import lxml.etree as etree

house_url = "https://shop.savognin.ch/Savognin/ukv/house/TDS00020010019636954"
calendar_url = "https://shop.savognin.ch/Savognin/ukv/ajax/calendar/TDS00020010019636959?date=\$date&rand=\$rand"

crook_headers = {'Cookie': 'tt=t'}

http = urllib3.PoolManager(cert_reqs='CERT_REQUIRED', ca_certs=certifi.where())

print("Acquiring ticket...")

#resp = http.request('GET', house_url, headers=crook_headers, preload_content=False)
resp = open("house.xml")

doc = lxml.html.parse(resp).getroot()

#resp.release_conn()

rand = doc.xpath("//span/@data-tp-calendar-rand")[0]

print("... got ticket: rand=" + rand)

for date in ('2017-08',):
    resp = os.open("data.2017-08.xml").read()
    doc = lxml.html.fragment_fromstring(resp, create_parent='div')
    # doc = doc.xpath("/html/body/div")[0] # ???
    # doc = doc.xpath("/div/div[1]/div")[0]
    doc = doc.xpath("/*")[0]
    print(doc)
    #print(lxml.html.tostring(doc, pretty_print=True, encoding='utf-8').decode('utf-8'))

print("Success!")
