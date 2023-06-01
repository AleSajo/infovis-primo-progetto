import pandas as pd

# imposto colonne del dataframe
data = {
    'anno': [],
    'idroelettrica': [],
    'eolica': [],
    'fotovoltaica': [],
    'geotermica': []
}

df = pd.DataFrame(data)

new_row = {'anno':2008, 'idroelettrica':41623, 'eolica':4861, 'fotovoltaica':193, 'geotermica':5520}
new_df = pd.DataFrame([new_row])
df = pd.concat([df, new_df],ignore_index=True)

new_row = {'anno':2009, 'idroelettrica':49138, 'eolica':6542, 'fotovoltaica':676, 'geotermica':5341}
new_df = pd.DataFrame([new_row])
df = pd.concat([df, new_df],ignore_index=True)

new_row = {'anno':2010, 'idroelettrica':51116, 'eolica':9125, 'fotovoltaica':1905, 'geotermica':5375}
new_df = pd.DataFrame([new_row])
df = pd.concat([df, new_df],ignore_index=True)

new_row = {'anno':2011, 'idroelettrica':45822, 'eolica':9856, 'fotovoltaica':10795, 'geotermica':5654}
new_df = pd.DataFrame([new_row])
df = pd.concat([df, new_df],ignore_index=True)

new_row = {'anno':2012, 'idroelettrica':41874, 'eolica':13407, 'fotovoltaica':18861, 'geotermica':5591}
new_df = pd.DataFrame([new_row])
df = pd.concat([df, new_df],ignore_index=True)

new_row = {'anno':2013, 'idroelettrica':52773, 'eolica':14897, 'fotovoltaica':21588, 'geotermica':5659}
new_df = pd.DataFrame([new_row])
df = pd.concat([df, new_df],ignore_index=True)

new_row = {'anno':2014, 'idroelettrica':58545, 'eolica':15178, 'fotovoltaica':22306, 'geotermica':5916}
new_df = pd.DataFrame([new_row])
df = pd.concat([df, new_df],ignore_index=True)

new_row = {'anno':2015, 'idroelettrica':45537, 'eolica':14843, 'fotovoltaica':22942, 'geotermica':6185}
new_df = pd.DataFrame([new_row])
df = pd.concat([df, new_df],ignore_index=True)

new_row = {'anno':2016, 'idroelettrica':42431, 'eolica':17688, 'fotovoltaica':22104, 'geotermica':6288}
new_df = pd.DataFrame([new_row])
df = pd.concat([df, new_df],ignore_index=True)

new_row = {'anno':2017, 'idroelettrica':36198, 'eolica':17741, 'fotovoltaica':24377, 'geotermica':6201}
new_df = pd.DataFrame([new_row])
df = pd.concat([df, new_df],ignore_index=True)

df.set_index('anno', inplace=True)

print(df)


# questo lo commento per ora perché esce una sintassi che non mi fa lavorare
# df.to_json("data/dataset.json", orient='index')
df.to_csv("data/dataset.csv")
df.to_excel("data/dataset.xlsx")