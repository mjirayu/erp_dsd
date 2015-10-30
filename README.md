#ERP_DSD


#API DOCUMENT

##Supplier
1. POST --->  /api/supplier  Add new supplier
2. GET --->  /api/supplier   Get all supplier
3. DELETE ---> /api/supplier/:id   Delete supplier by id
4. PUT   ---> /api/supplier/:id  Update data according to id
5. Seacrch ---> /api/supplier/search?key=value   Search supplier by query data
    ###List of query data
    1. code ---> supplier code  ex --> PO001,PO002
    2. name ---> supplier name  ex --> 'Cp all', 'Kmutt'
    3. status ---> supplier status @#@$#@%@#%$#@% not define yet!

## Price
1. POST --->  /api/price  Add new price
2. GET --->  /api/price   Get all price
3. DELETE ---> /api/price/:id   Delete price by id
4. PUT   ---> /api/price/:id  Update data according to id
5. Seacrch ---> /api/price/search?key=value   Search price by query data
    ###List of query data
    1. gte --->  Price greater than or equal X or minimun price for search  ex 10, 200
    2. lte --->  Price Less than or equal X or Maximun price for search  ex 1000, 200000
    3. sp_code ---> Supplier code * can search with fullname or not fullname if we have supplier code SP0001 you can search only SP0, SP0001 also found!* ex SP0, SP123 
    4. sp_name ---> Supplier name and it same as sp_name ex 'cp all', 'bangkok'
    5. pd_code ---> Product code and it same as pd_code ex PO0001, PO0
    6. pd_name ---> Product name and it same as sp_name ex 'MAMA', 'F16', 'ABS091'
    7. date_start ---> Start date of value that you want to find ex 2015/2/3
    8. date_stop ---> End date of value that you want to find ex 2025/7/3
