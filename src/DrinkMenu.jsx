import { useState } from 'react'
import './DrinkMenu.css'

function DrinkMenu() {
  // 將菜單轉為資料格式
  const drinkMenusItem = [
    { id: 1, name: "珍珠奶茶", describe: "香濃奶茶搭配QQ珍珠", price: 50, instock: 20 },
    { id: 2, name: "冬瓜檸檬", describe: "清新冬瓜配上新鮮檸檬", price: 45, instock: 18 },
    { id: 3, name: "翡翠檸檬", describe: "綠茶與檸檬的完美結合", price: 55, instock: 34 },
    { id: 4, name: "四季春茶", describe: "香醇四季春茶，回甘無比", price: 45, instock: 10 },
    { id: 5, name: "阿薩姆奶茶", describe: "阿薩姆紅茶搭配香醇鮮奶", price: 50, instock: 25 },
    { id: 6, name: "檸檬冰茶", describe: "檸檬與冰茶的清新組合", price: 45, instock: 20 },
    { id: 7, name: "芒果綠茶", describe: "芒果與綠茶的獨特風味", price: 55, instock: 18 },
    { id: 8, name: "抹茶拿鐵", describe: "抹茶與鮮奶的絕配", price: 60, instock: 20 }
  ];

  //設定菜單資料和警告狀態
  const [drinkMenus, setDrinkMenus] = useState(drinkMenusItem);
  const [showWarning, setShowWarning] = useState(false);

  //新增、修改hook
  const [newItem, setNewItem] = useState({ name: '', describe: '', price: 0, instock: 0 });
  const [editingItemId, setEditingItemId] = useState(null);
  const [addingNewItem, setAddingNewItem] = useState(false);

  //點擊增加按鈕時
  const handleDecrease = (id) => {
    setDrinkMenus((prevMenus) => 
        prevMenus.map((menu) =>
            menu.id === id && menu.instock > 0
                ? { ...menu, instock: menu.instock - 1 } : menu
        )
    );

    if (drinkMenus.find((menu) => menu.id === id)?.instock <= 1) {
        setShowWarning(true);
    }
  };
  //點擊減少按鈕時
  const handleIncrease = (id) => {
    setDrinkMenus((prevMenus) =>
        prevMenus.map((menu) => 
            menu.id === id ? { ...menu, instock: menu.instock + 1 } : menu
        )
    );
    // setShowWarning(false); // 重置警告狀態
  };

  //過濾出庫存是0的飲品
  const outOfStockItems = drinkMenus.filter((menu) => menu.instock === 0);

  //以下為修改、新增、刪除操作
  const handleEditClick = (id) => {
    setEditingItemId(id);
    const editingItem = drinkMenus.find((menu) => menu.id === id);
    setNewItem({ ...editingItem });
    setAddingNewItem(false);
  };

  const handleSaveClick = () => {
    // 儲存修改的資料，Math.max確保價格和庫存的值不會小於0
    const updatedMenus = drinkMenus.map((menu) =>
        menu.id === editingItemId
            ? { ...menu, ...newItem, price: Math.max(newItem.price, 0), instock: Math.max(newItem.instock, 0) } : menu
    );
    setDrinkMenus(updatedMenus);
    setEditingItemId(null);
    setNewItem({ name: '', describe: '', price: 0, instock: 0 });
  };

  const handleCancelClick = () => {
    setEditingItemId(null);
    setNewItem({ name: '', describe: '', price: 0, instock: 0 });
  };

  const handleAddItem = () => {
    // 新增資料操作
    setAddingNewItem(true);
    setNewItem({ name: '', describe: '', price: 0, instock: 0 });
  };

  const handleConfirmAddItem = () => {
    const newId = Math.max(...drinkMenus.map((menu) => menu.id)) + 1;
    const updatedMenus = [...drinkMenus, { ...newItem, id: newId }];
    setDrinkMenus(updatedMenus);
    setAddingNewItem(false);
    setNewItem({ name: '', describe: '', price: 0, instock: 0 });
  };

  const handleDeleteItem = (id) => {
    // 刪除資料操作
    const updatedMenus = drinkMenus.filter((menu) => menu.id !== id);
    setDrinkMenus(updatedMenus);
  };


  return (
    <>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th scope="col" className='name'>品項</th>
                        <th scope="col" className='describe'>描述</th>
                        <th scope="col" className='price'>價格</th>
                        <th scope="col" className='instock'>庫存</th>
                        <th scope="col" className='action'>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {drinkMenus.map((drinkMenu) => 
                        <tr key={drinkMenu.id}>
                            <td>{drinkMenu.name}</td>
                            <td><small>{drinkMenu.describe}</small></td>
                            <td>{drinkMenu.price}</td>
                            <td>
                                <button onClick={() => handleDecrease(drinkMenu.id)} disabled={drinkMenu.instock === 0}>-</button>
                                {drinkMenu.instock}
                                <button onClick={() => handleIncrease(drinkMenu.id)}>+</button>
                                {/* {drinkMenu.instock === 0 && showWarning && <span style={{ color: 'red' }}>庫存已經為0</span>} */}
                            </td>

                            {/* 編輯及刪除操作 */}
                            <td>
                                {editingItemId === drinkMenu.id ? (
                                    <>
                                        {/* <button onClick={handleSaveClick}>Save</button>
                                        <button onClick={handleCancelClick}>Cancel</button> */}
                                        編輯中...
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditClick(drinkMenu.id)}>Edit</button>
                                        <button onClick={() => handleDeleteItem(drinkMenu.id)}>Delete</button>
                                    </>
                                )}
                            </td>

                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        {/* 編輯飲品菜單 */}
        {editingItemId !== null && (
        <div className="modal-background">
        <div className="modal-container">
        <div className="modal-content">
            <div className="add-edit-form">
                <h2>編輯品項</h2>
                <div className="form-field">
                    <label htmlFor="name">名稱: </label>
                    <input
                        type="text"
                        placeholder="名稱"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="describe">描述: </label>
                    <input
                        type="text"
                        placeholder="描述"
                        value={newItem.describe}
                        onChange={(e) => setNewItem({ ...newItem, describe: e.target.value })}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="price">價格: </label>
                    <input
                        type="number"
                        placeholder="價格"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                        min="0" // 設定最小值為0
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="instock">庫存: </label>
                    <input
                        type="number"
                        placeholder="庫存"
                        value={newItem.instock}
                        onChange={(e) => setNewItem({ ...newItem, instock: parseInt(e.target.value) })}
                        min="0" // 設定最小值為0
                    />
                </div>
                <div className="form-buttons">
                    <button onClick={handleSaveClick}>儲存</button>
                    <button onClick={handleCancelClick}>取消</button>
                </div>
            </div>
        </div>
        </div>
        </div>
        )}
        
        {/* 新增飲品菜單 */}
        {addingNewItem && (
        <div className="modal-background">
        <div className="modal-container">
        <div className="modal-content">
            <div className="add-edit-form">
                <h2>新增品項</h2>
                <div className="form-field">
                    <label htmlFor="name">名稱: </label>
                    <input
                        type="text"
                        placeholder="名稱"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="describe">描述: </label>
                    <input
                        type="text"
                        placeholder="描述"
                        value={newItem.describe}
                        onChange={(e) => setNewItem({ ...newItem, describe: e.target.value })}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="price">價格: </label>
                    <input
                        type="number"
                        placeholder="價格"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                        min="0" // 設定最小值為0
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="instock">庫存: </label>
                    <input
                        type="number"
                        placeholder="庫存"
                        value={newItem.instock}
                        onChange={(e) => setNewItem({ ...newItem, instock: parseInt(e.target.value) })}
                        min="0" // 設定最小值為0
                    />
                </div>
                <div className="form-buttons">
                    <button onClick={handleConfirmAddItem}>新增</button>
                    <button onClick={() => setAddingNewItem(false)}>取消</button>
                </div>
            </div>
        </div>
        </div>
        </div>
        )}
        <div className="actions">
            {!addingNewItem  && editingItemId == null && (
                <button onClick={handleAddItem}>新增品項</button>
            )}

            {outOfStockItems.length > 0 && (
                <div className={`warning ${showWarning ? 'show' : ''}`}>
                    <p>以下品項庫存已經為0：</p>
                    <ul>
                        {outOfStockItems.map((item) => (
                        <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </>
  )
}

export default DrinkMenu;
