
from lorem_text import lorem
import random
import requests
origins = ["Viet Nam", "China", "USA"]
url = 'http://localhost:3000/postproduct'

file1 = open('data.txt', 'r', encoding="utf8")
Lines = file1.readlines()

count = 0
# Strips the newline character
for line in Lines:
    productArray = []
    ans = ""
    for i in line:
        if (i == ","):
            productArray.append(ans)
            ans = ""
        else:
            ans += i
    productDict = {
        "id": random.randint(1, 3),
        "product_name": productArray[1],
        "description": lorem.sentence(),
        "origin": random.choice(origins),
        "stock": productArray[3],
        "price": productArray[2],
        "cat": random.randint(0, 10),
        "product_image": productArray[7],
    }
    print(productDict)

    x = requests.post(url, data=productDict)

    print(x.text)
