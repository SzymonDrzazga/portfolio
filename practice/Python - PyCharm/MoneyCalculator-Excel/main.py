import time

from bs4 import BeautifulSoup
import requests
import pandas as pd
import openpyxl

from selenium import webdriver
from selenium.webdriver.common.by import By

name = ""
password = ""


driver = webdriver.Chrome()
# r"C:\Program Files (x86)\chromedriver.exe"

driver.get("https://portal.librus.pl/rodzina")

driver.find_element(By.XPATH, "/html/body/nav/div/div[1]/div/div[2]/a[3]").click()
driver.find_element(By.XPATH, "/html/body/nav/div/div[1]/div/div[2]/div/a[2]").click()

driver.switch_to.frame("caLoginIframe")

driver.find_element(By.XPATH, "/html/body/main/div/div/div/div[1]/div[3]/div[1]/div[1]/input") \
    .send_keys(name)
driver.find_element(By.XPATH, "/html/body/main/div/div/div/div[1]/div[3]/div[2]/div[1]/input") \
    .send_keys(password)
driver.find_element(By.XPATH, "/html/body/main/div/div/div/div[2]/button").click()
time.sleep(5)
driver.find_element(By.XPATH, "/html/body/div[3]/div[1]/div[2]/div/ul/li[2]/a").click()

response = requests.get("https://synergia.librus.pl/przegladaj_oceny/uczen")
soup = BeautifulSoup(response.text, "lxml")
# table = soup.find("table", class_="decorated stretch")
# table = driver.find_elements(By.XPATH, "/html/body/div[3]/div[3]/form[1]/div/div/table/tbody/tr[1]/td[2]")

data = []

oceny = driver.find_elements(By.CLASS_NAME, 'ocena')

#for i in oceny:
#    print(i.text)


# table = []
# for i in range(1, grades):
#     table.append(
#         driver.find_element(By.XPATH,
#                             f"/html/body/div[3]/div[3]/form[1]/div/div/table/tbody/tr[1]/td[3]/span[{i}]/a").text)
# print(table)

for j in range(1, 34, 2):
    item = {}

    item["Subject"] = \
        driver.find_element(By.XPATH, f"/html/body/div[3]/div[3]/form[1]/div/div/table/tbody/tr[{j}]/td[2]").text

    #grades = len(driver.find_elements(By.XPATH, f"/html/body/div[3]/div[3]/form[1]/div/div/table/tbody/tr[{j}]/td[3]"))

    grades = driver.find_element(By.XPATH, f"/html/body/div[3]/div[3]/form[1]/div/div/table/tbody/tr[{j}]/td[3]")
    ocena = len(grades.find_elements(By.CLASS_NAME, 'ocena'))

    if ocena > 0:
        for i in range(1, ocena + 1):
            item[f"{i}"] = \
                driver.find_element(By.XPATH,
                                f"/html/body/div[3]/div[3]/form[1]/div/div/table/tbody/tr[{j}]/td[3]/span[{i}]/a").text
        # print(item)


    grades2 = driver.find_element(By.XPATH, f"/html/body/div[3]/div[3]/form[1]/div/div/table/tbody/tr[{j}]/td[7]")
    ocena2 = len(grades2.find_elements(By.CLASS_NAME, 'ocena'))

    if ocena2 > 0:
        for i in range(1, ocena2 + 1):
            item[f"{i+8}"] = \
                driver.find_element(By.XPATH,
                                f"/html/body/div[3]/div[3]/form[1]/div/div/table/tbody/tr[{j}]/td[7]/span[{i}]/a").text

    data.append(item)
item = {}
item["Subject"] = '=LICZ.JEŻELI(B2:U19, "1*") * -20'
data.append(item)

item = {}
item["Subject"] = '=LICZ.JEŻELI(B2:U19, "2*") * -10'
data.append(item)

item = {}
item["Subject"] = '=LICZ.JEŻELI(B2:U19, "3*") * 0'
data.append(item)

item = {}
item["Subject"] = '=LICZ.JEŻELI(B2:U19, "4*") * 5'
data.append(item)

item = {}
item["Subject"] = '=LICZ.JEŻELI(B2:U19, "5*") * 10'
data.append(item)

item = {}
item["Subject"] = '=LICZ.JEŻELI(B2:U19, "6*") * 20'
data.append(item)

item = {}
item["Subject"] = '=''SUMA(A19:A24)'
data.append(item)


df = pd.DataFrame(data)

df.to_excel("books.xlsx", index=False)
driver.quit()


