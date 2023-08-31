
import { useState } from 'react'
import './index.css'
const groceryItems = [
  {
    id: 1,
    name: "Kopi Bubuk",
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
    name: 'Gula Pasir',
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: 'Air Mineral',
    quantity: 3,
    checked: false,
  },

]
export default function App() {
const [items,setItems]=useState(groceryItems)

function handleAddItems(item){
  setItems([...items,item])
}

function handleRemoveitems(id){
    setItems((items)=>items.filter((item)=>item.id !== id))
}

function handleToggleItems(id){
  setItems((items)=>items.map((item)=>item.id===id ? {...item,checked:!item.checked} : item ))
}

function handleClearItems (){
  setItems([])
}
  return (
    <>

      <div className="apps">
        <Header />
        <Form onAddItems={handleAddItems} />
        <GroceryList items={items} onDeleteItems={handleRemoveitems} onToggleItems={handleToggleItems} onClearItems={handleClearItems}/>
        <Footer items={items}/>
      </div>

    </>
  )
}


function Header() {
  return <h1>Hari ini belanja apa kita?</h1>
}


function Form({onAddItems}) {

  const [name,setName]=useState('')
  const [quantity,setQuatity]=useState(1)

 const quentityNum=[...Array(20)].map((_,i)=>(
  <option value={i+1} key={i+1}>{i+1}</option>
 ))

 const handleSubmit = (e)=>{
  e.preventDefault()

  if(!name){
    return null
  }
  const newItems={name,quantity,checked:false,id:Date.now()}
  onAddItems(newItems)
  console.log(newItems)
  setName('')
  setQuatity(1)
 }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Catatan Belanjaku 📝</h3>
      <div>
        <select value={quantity} onChange={(e)=>setQuatity(Number(e.target.value))}>
          {quentityNum}
        </select>
        <input type="text" placeholder="nama barang..." value={name} onChange={(e)=>setName(e.target.value)}  />
      </div>
      <button>Tambah</button>
    </form>
  )
}


function GroceryList({items,onDeleteItems,onToggleItems,onClearItems}) {

  const [sortBy,setSortBy]=useState('input')
  let sortedItems

  if (sortBy==='input'){
    sortedItems=items
  }

  if(sortBy==='name'){
    sortedItems=items.slice().sort((a,b)=>a.name.localeCompare(b.name))
  }
  if(sortBy==='checked'){
    sortedItems=items.slice().sort((a,b)=>a.checked - b.checked )
  }

 
  return (
    <>
      <div className="list">
        <ul>
          { sortedItems.map((item)=>(

         <Item item={item} key={item.id} onDeleteItems={onDeleteItems} onToggleItems={onToggleItems} />
          ))}
         
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={onClearItems}>Bersihkan Daftar</button>
      </div>
    </>
  )
}

function Item ({item,onDeleteItems,onToggleItems}){

  
  return(
    <li key={item.id}>
    <input type="checkbox" onChange={()=>onToggleItems(item.id)} checked={item.checked}/>
    <span style={item.checked ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.name}</span>
    <button onClick={()=>onDeleteItems(item.id)}>x</button>
  </li>
  )
}

function Footer({items}) {
  if(items.length===0) return <footer className="stats">
  Daftar Belanjaan Masih Kosong
</footer>
  const totalItems =items.length
  const checkedItems=items.filter((item)=>item.checked).length
  const presentage = Math.round((checkedItems/totalItems)*100)
  return <footer className="stats">
    Ada {totalItems} barang di daftar belanjaan, {checkedItems} barang sudah dibeli ({presentage}%) 
  </footer>
}
