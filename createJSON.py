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
df = df.append(new_row, ignore_index=True)

new_row = {'anno':2009, 'idroelettrica':49138, 'eolica':6542, 'fotovoltaica':676, 'geotermica':5341}
df = df.append(new_row, ignore_index=True)

new_row = {'anno':2010, 'idroelettrica':51116, 'eolica':9125, 'fotovoltaica':1905, 'geotermica':5375}
df = df.append(new_row, ignore_index=True)

new_row = {'anno':2011, 'idroelettrica':45822, 'eolica':9856, 'fotovoltaica':10795, 'geotermica':5654}
df = df.append(new_row, ignore_index=True)

new_row = {'anno':2012, 'idroelettrica':41874, 'eolica':13407, 'fotovoltaica':18861, 'geotermica':5591}
df = df.append(new_row, ignore_index=True)

new_row = {'anno':2013, 'idroelettrica':52773, 'eolica':14897, 'fotovoltaica':21588, 'geotermica':5659}
df = df.append(new_row, ignore_index=True)

new_row = {'anno':2014, 'idroelettrica':58545, 'eolica':15178, 'fotovoltaica':22306, 'geotermica':5916}
df = df.append(new_row, ignore_index=True)

new_row = {'anno':2015, 'idroelettrica':45537, 'eolica':14843, 'fotovoltaica':22942, 'geotermica':6185}
df = df.append(new_row, ignore_index=True)

new_row = {'anno':2016, 'idroelettrica':42431, 'eolica':17688, 'fotovoltaica':22104, 'geotermica':6288}
df = df.append(new_row, ignore_index=True)

new_row = {'anno':2017, 'idroelettrica':36198, 'eolica':17741, 'fotovoltaica':24377, 'geotermica':6201}
df = df.append(new_row, ignore_index=True)

print(df)

df.to_json