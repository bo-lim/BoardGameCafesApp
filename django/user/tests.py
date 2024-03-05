<<<<<<< HEAD
=======
from django.test import TestCase

import cx_Oracle
dns = cx_Oracle.makedsn('localhost', 1522, 'xe')
conn = cx_Oracle.connect('c##p_test', 'oracle', dns)

cursor = conn.cursor()
sql = "select * from User_list"
cursor.execute(sql)

for record in cursor:
    print(record)

cursor.close()
conn.close()

# Create your tests here.
>>>>>>> 5d3a31e260116d730981cf0252f70079f3b9cc9f
