const sizes2 = [{id:1,value:'XS'},{id:2,value:'S'},{id:3,value:'M'} ,{id:5,value:'L'} ,{id:8,value:'XL'} ,{id:10,value:'XXL'}]
export const sizesMap = new Map();
sizes2.forEach((item: any)=>{
  sizesMap.set(item.id, item.value);
});
