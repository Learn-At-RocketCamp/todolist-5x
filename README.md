# TodoList-5xHex

## 【TODO】

- notes
  - list work flow

- API
  - PUT
    - #FIX:

- js
  - type-module

- CSS
  - PC

---

## 【FLOW】

A. Page-Home

- section-Form-LogIn
- section-Form-SignUp

B. Page-Todos

---

### P0-goHome

#### P0-1_checkLocalToken

- false => goHome

#### P0-2_checkAuthLogin

- false => goHome

#### P0-3_showTodoPage

---

### P1-goTodoPage

#### P1-1_getTodoData

---

### P2_goSignUp

#### P2-1_sendSignUp

- false => Stay

#### P2-2_showTodoPage

---

## 【DONE】

- API
  - check
    - localStorage
  - login
  - signup
  - todos
    - GET
    - POST
    - PATCH
    - DELETE

---

## 【NOTE】

### 【VSCode】

- collapse all
  - `Ctrl-K` + `Ctrl-0`

- open all
  - `Ctrl-K` + `Ctrl-M`

---

### 【axios】

```JS
(<URI>, <{ Object } data>, <config>)
```

- #XXX: `JSON.stringify({ user })`
  - `<user>` is Object name to 5xAPI

---

### 【addEventListener】

- place outer, or req getting burnout
