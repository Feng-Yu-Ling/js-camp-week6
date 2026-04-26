// ========================================
// 第六週作業：電商 API 資料串接練習
// 執行方式：node homework.js
// 環境需求：Node.js 18+（內建 fetch）
// ========================================

// 載入環境變數
require("dotenv").config({ path: ".env" });

// API 設定（從 .env 讀取）
const API_PATH = process.env.API_PATH;
const BASE_URL = "https://livejs-api.hexschool.io";
const ADMIN_TOKEN = process.env.API_KEY;

// ========================================
// 任務一：基礎 fetch 練習
// ========================================

/**
 * 1. 取得產品列表
 * 使用 fetch 發送 GET 請求
 * @returns {Promise<Array>} - 回傳 products 陣列
 */
async function getProducts() {
	// 請實作此函式
	// 提示：
	// 1. 使用 fetch() 發送 GET 請求
	// 2. 使用 response.json() 解析回應
	// 3. 回傳 data.products
	// 透過 try...catch 處理錯誤
	try {
		const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`);
		/*
		fetch 方法在 HTTP 錯誤碼為 4xx/5xx 時並不會拋出錯誤，
		try...catch 並不會捕捉到這種類型的錯誤，
		此時需要透過 response.ok 進行檢查
		*/
		if (!response.ok) {
			// 透過 throw new Error 將這類錯誤交給 catch 區塊處理
			throw new Error(`HTTP 錯誤，狀態碼：${response.status}`);
		}
		/*
		fetch()
		屬於非同步操作，前面需要加上 await，
		這方法回傳的是回應物件，而不是資料本身。
		資料還在 body 裡，而且是 stream 格式，尚未解析完成。
		body: { stream: undefined }
		依照伺服器回傳的資料類型有各種方法進行解析：
		JSON → .json()
		純文字 → .text()
		Blob（檔案）→ .blob()
		ArrayBuffer → .arrayBuffer()
		由於網路資料可能很大，所以進行解析的時候也是非同步操作，需要加上 await。
		這樣就能把它轉換成可用的資料。
		*/
		const data = await response.json();
		// console.log("回傳的 data:", data);
		return data.products
	}
	catch(error) {
		console.error("發生錯誤：", error);
		// 明確退出函式，避免執行後續程式碼造成非預期行為
		return;
	}
}

/**
 * 2. 取得購物車列表
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function getCart() {
	// 請實作此函式
	try {
		const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`);
		/*
		fetch 方法在 HTTP 錯誤碼為 4xx/5xx 時並不會拋出錯誤，
		try...catch 並不會捕捉到這種類型的錯誤，
		此時需要透過 response.ok 進行檢查
		*/
		if (!response.ok) {
			// 透過 throw new Error 將這類錯誤交給 catch 區塊處理
			throw new Error(`HTTP 錯誤，狀態碼：${response.status}`);
		}
		/*
		fetch()
		屬於非同步操作，前面需要加上 await，
		這方法回傳的是回應物件，而不是資料本身。
		資料還在 body 裡，而且是 stream 格式，尚未解析完成。
		body: { stream: undefined }
		依照伺服器回傳的資料類型有各種方法進行解析：
		JSON → .json()
		純文字 → .text()
		Blob（檔案）→ .blob()
		ArrayBuffer → .arrayBuffer()
		由於網路資料可能很大，所以進行解析的時候也是非同步操作，需要加上 await。
		這樣就能把它轉換成可用的資料。
		*/
		const data = await response.json();
		// console.log({
		// 	carts: data.carts,
		// 	total: data.total,
		// 	finalTotal: data.finalTotal
		// });
		return {
			carts: data.carts,
			total: data.total,
			finalTotal: data.finalTotal
		}
		
	}
	catch(error) {
		console.error("發生錯誤：", error);
		// 明確退出函式，避免執行後續程式碼造成非預期行為
		return;
	}
}

/**
 * 3. 錯誤處理：當 API 回傳錯誤時，回傳錯誤訊息
 * @returns {Promise<Object>} - 回傳 { success: boolean, data?: [...], error?: string }
 */
async function getProductsSafe() {
	// 請實作此函式
	// 提示：
	// 1. 加上 try-catch 處理錯誤
	// 2. 檢查 response.ok 判斷是否成功
	// 3. 成功回傳 { success: true, data: [...] }
	// 4. 失敗回傳 { success: false, error: '錯誤訊息' }
	try {
		const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`);
		/*
		fetch 方法在 HTTP 錯誤碼為 4xx/5xx 時並不會拋出錯誤，
		try...catch 並不會捕捉到這種類型的錯誤，
		此時需要透過 response.ok 進行檢查
		*/
		if (!response.ok) {
			// 透過 throw new Error 將這類錯誤交給 catch 區塊處理
			throw new Error(`HTTP 錯誤，狀態碼：${response.status}`);
		}
		/*
		fetch()
		屬於非同步操作，前面需要加上 await，
		這方法回傳的是回應物件，而不是資料本身。
		資料還在 body 裡，而且是 stream 格式，尚未解析完成。
		body: { stream: undefined }
		依照伺服器回傳的資料類型有各種方法進行解析：
		JSON → .json()
		純文字 → .text()
		Blob（檔案）→ .blob()
		ArrayBuffer → .arrayBuffer()
		由於網路資料可能很大，所以進行解析的時候也是非同步操作，需要加上 await。
		這樣就能把它轉換成可用的資料。
		*/
		const data = await response.json();
		// console.log({
		// 	success: response.ok,
		// 	data: data.products
		// });
		return {
			success: response.ok,
			data: data.products
		}
		
	}
	catch(error) {
		// console.error({
		// 	success: false,
		// 	error: error.message
		// });
		return {
			success: false,
			error: error.message
		}
	}
}

// ========================================
// 任務二：POST 請求 - 購物車操作
// ========================================

/**
 * 1. 加入商品到購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳更新後的購物車資料
 */
async function addToCart(productId, quantity) {
	// 請實作此函式
	// 提示：
	// 1. 發送 POST 請求
	// 2. body 格式：{ data: { productId: "xxx", quantity: 1 } }
	// 3. 記得設定 headers: { 'Content-Type': 'application/json' }
	// 4. body 要用 JSON.stringify() 轉換
	try {
		const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`, {
			// method: 使用的 HTTP 方法（不明寫的話預設是 GET 方法）
			method: "POST",
			// headers: 告訴伺服器這次傳送的資料類型是 JSON 格式
			headers: { "Content-Type": "application/json" },
			// body: 要傳送的資料放在 body。物件不能直接傳，要先用 JSON.stringify 轉換成字串
			// ⚠️ LiveJS 的坑：body 要在外面再包一層 { data: ... }
			// 當物件的屬性與變數名稱相同時，可以簡寫
			body: JSON.stringify({ data: { productId, quantity } }),
		});
		/*
		fetch 方法在 HTTP 錯誤碼為 4xx/5xx 時並不會拋出錯誤，
		try...catch 並不會捕捉到這種類型的錯誤，
		此時需要透過 response.ok 進行檢查
		*/
		if (!response.ok) {
			// 透過 throw new Error 將這類錯誤交給 catch 區塊處理
			throw new Error(`HTTP 錯誤，狀態碼：${response.status}`);
		}
		/*
		fetch()
		屬於非同步操作，前面需要加上 await，
		這方法回傳的是回應物件，而不是資料本身。
		資料還在 body 裡，而且是 stream 格式，尚未解析完成。
		body: { stream: undefined }
		依照伺服器回傳的資料類型有各種方法進行解析：
		JSON → .json()
		純文字 → .text()
		Blob（檔案）→ .blob()
		ArrayBuffer → .arrayBuffer()
		由於網路資料可能很大，所以進行解析的時候也是非同步操作，需要加上 await。
		這樣就能把它轉換成可用的資料。
		*/
		const data = await response.json();
		// console.log("回傳的 data:", data);
		return data
		
	}
	catch(error) {
		console.error("發生錯誤：", error);
		// 明確退出函式，避免執行後續程式碼造成非預期行為
		return;
	}
}

/**
 * 2. 編輯購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳更新後的購物車資料
 */
async function updateCartItem(cartId, quantity) {
	// 請實作此函式
	// 提示：
	// 1. 發送 PATCH 請求
	// 2. body 格式：{ data: { id: "購物車ID", quantity: 數量 } }
	try {
		const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`, {
			// method: 使用的 HTTP 方法（不明寫的話預設是 GET 方法）
			method: "PATCH",
			// headers: 告訴伺服器這次傳送的資料類型是 JSON 格式
			headers: { "Content-Type": "application/json" },
			// body: 要傳送的資料放在 body。物件不能直接傳，要先用 JSON.stringify 轉換成字串
			// ⚠️ LiveJS 的坑：body 要在外面再包一層 { data: ... }
			// 當物件的屬性與變數名稱相同時，可以簡寫
			body: JSON.stringify({ data: { id: cartId, quantity } })
		});
		/*
		fetch 方法在 HTTP 錯誤碼為 4xx/5xx 時並不會拋出錯誤，
		try...catch 並不會捕捉到這種類型的錯誤，
		此時需要透過 response.ok 進行檢查
		*/
		if (!response.ok) {
			// 透過 throw new Error 將這類錯誤交給 catch 區塊處理
			throw new Error(`HTTP 錯誤，狀態碼：${response.status}`);
		}
		/*
		fetch()
		屬於非同步操作，前面需要加上 await，
		這方法回傳的是回應物件，而不是資料本身。
		資料還在 body 裡，而且是 stream 格式，尚未解析完成。
		body: { stream: undefined }
		依照伺服器回傳的資料類型有各種方法進行解析：
		JSON → .json()
		純文字 → .text()
		Blob（檔案）→ .blob()
		ArrayBuffer → .arrayBuffer()
		由於網路資料可能很大，所以進行解析的時候也是非同步操作，需要加上 await。
		這樣就能把它轉換成可用的資料。
		*/
		const data = await response.json();
		// console.log("回傳的 data:", data);
		return data
		
	}
	catch(error) {
		console.error("發生錯誤：", error);
		// 明確退出函式，避免執行後續程式碼造成非預期行為
		return;
	}
}

/**
 * 3. 刪除購物車特定商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳更新後的購物車資料
 */
async function removeCartItem(cartId) {
	// 請實作此函式
	// 提示：發送 DELETE 請求到 /carts/{id}
	try {
		const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`, {
		// method: 使用的 HTTP 方法（不明寫的話預設是 GET 方法）
		method: "DELETE",
		// headers: 告訴伺服器這次傳送的資料類型是 JSON 格式
		headers: { "Content-Type": "application/json" }
		});
		/*
		fetch 方法在 HTTP 錯誤碼為 4xx/5xx 時並不會拋出錯誤，
		try...catch 並不會捕捉到這種類型的錯誤，
		此時需要透過 response.ok 進行檢查
		*/
		if (!response.ok) {
			// 透過 throw new Error 將這類錯誤交給 catch 區塊處理
			throw new Error(`HTTP 錯誤，狀態碼：${response.status}`);
		}
		/*
		fetch()
		屬於非同步操作，前面需要加上 await，
		這方法回傳的是回應物件，而不是資料本身。
		資料還在 body 裡，而且是 stream 格式，尚未解析完成。
		body: { stream: undefined }
		依照伺服器回傳的資料類型有各種方法進行解析：
		JSON → .json()
		純文字 → .text()
		Blob（檔案）→ .blob()
		ArrayBuffer → .arrayBuffer()
		由於網路資料可能很大，所以進行解析的時候也是非同步操作，需要加上 await。
		這樣就能把它轉換成可用的資料。
		*/
		const data = await response.json();
		// console.log("回傳的 data:", data);
		return data
	}
	catch(error) {
		console.error("發生錯誤：", error);
		// 明確退出函式，避免執行後續程式碼造成非預期行為
		return;
	}
	
}

/**
 * 4. 清空購物車
 * @returns {Promise<Object>} - 回傳清空後的購物車資料
 */
async function clearCart() {
	// 請實作此函式
	// 提示：發送 DELETE 請求到 /carts
	try {
		const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`, {
			// method: 使用的 HTTP 方法（不明寫的話預設是 GET 方法）
			method: "DELETE",
			// headers: 告訴伺服器這次傳送的資料類型是 JSON 格式
			headers: { "Content-Type": "application/json" }
		});
		/*
		fetch 方法在 HTTP 錯誤碼為 4xx/5xx 時並不會拋出錯誤，
		try...catch 並不會捕捉到這種類型的錯誤，
		此時需要透過 response.ok 進行檢查
		*/
		if (!response.ok) {
			// 透過 throw new Error 將這類錯誤交給 catch 區塊處理
			throw new Error(`HTTP 錯誤，狀態碼：${response.status}`);
		}
		/*
		fetch()
		屬於非同步操作，前面需要加上 await，
		這方法回傳的是回應物件，而不是資料本身。
		資料還在 body 裡，而且是 stream 格式，尚未解析完成。
		body: { stream: undefined }
		依照伺服器回傳的資料類型有各種方法進行解析：
		JSON → .json()
		純文字 → .text()
		Blob（檔案）→ .blob()
		ArrayBuffer → .arrayBuffer()
		由於網路資料可能很大，所以進行解析的時候也是非同步操作，需要加上 await。
		這樣就能把它轉換成可用的資料。
		*/
		const data = await response.json();
		// console.log("回傳的 data:", data);
		return data
	}
	catch (error) {
		console.error("發生錯誤：", error);
		// 明確退出函式，避免執行後續程式碼造成非預期行為
		return;
	}
}

// ========================================
// HTTP 知識測驗 (額外練習)
// ========================================

/*
請回答以下問題（可以寫在這裡或另外繳交）：

1. HTTP 狀態碼的分類（1xx, 2xx, 3xx, 4xx, 5xx 各代表什麼）
   答：

1xx: 代表已收到請求，正在處理中。
2xx: 代表成功，其中 200 指 OK，而 201 指 created。
3xx: 代表重新導向。
4xx: 代表客戶端的錯誤。
5xx: 代表伺服器端的錯誤。

2. GET、POST、PATCH、PUT、DELETE 的差異
   答：

GET: 取得資料，headers 視情況添加（比如在 headers 放驗證資訊）通常不需要附上 body。
POST: 送出資料，headers 以及 body 視情況添加。
PATCH: 更新部分資料，只傳需要修改的欄位即可，headers 以及 body 視情況添加。
PUT: 更新整份資料，需要傳整份資料進行覆蓋，headers 以及 body 視情況添加。
DELETE: 刪除資料，headers 視情況添加，通常不需要 body。

以上都需要明確指定 HTTP method，某些工具預設不指定 method就是 GET

3. 什麼是 RESTful API？
   答：

RESTful 全名為 Representational State Transfer，是一種架構風格，
目的是要讓不同軟體或程式透過較為精簡的方式進行資訊交換。
網址只用來描述資源，而動作交給各種 HTTP 方法表達。
*/

// ========================================
// 匯出函式供測試使用
// ========================================
module.exports = {
	API_PATH,
	BASE_URL,
	ADMIN_TOKEN,
	getProducts,
	getCart,
	getProductsSafe,
	addToCart,
	updateCartItem,
	removeCartItem,
	clearCart,
};

// ========================================
// 直接執行測試
// ========================================
if (require.main === module) {
	async function runTests() {
		console.log("=== 第六週作業測試 ===\n");
		console.log("API_PATH:", API_PATH);
		console.log("");

		if (!API_PATH) {
			console.log("請先在 .env 檔案中設定 API_PATH！");
			return;
		}

		// 任務一測試
		console.log("--- 任務一：基礎 fetch ---");
		try {
			const products = await getProducts();
			console.log(
				"getProducts:",
				products ? `成功取得 ${products.length} 筆產品` : "回傳 undefined",
			);
		} catch (error) {
			console.log("getProducts 錯誤:", error.message);
		}

		try {
			const cart = await getCart();
			console.log(
				"getCart:",
				cart ? `購物車有 ${cart.carts?.length || 0} 筆商品` : "回傳 undefined",
			);
		} catch (error) {
			console.log("getCart 錯誤:", error.message);
		}

		try {
			const result = await getProductsSafe();
			console.log(
				"getProductsSafe:",
				result?.success ? "成功" : result?.error || "回傳 undefined",
			);
		} catch (error) {
			console.log("getProductsSafe 錯誤:", error.message);
		}

		console.log("\n=== 測試結束 ===");
		console.log("\n提示：執行 node test.js 進行完整驗證");
	}

	runTests();
}
