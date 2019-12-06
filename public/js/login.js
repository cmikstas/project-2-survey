<script>
<input id="changePass"/>
<button id="changePassBtn" "Button" onclick='changePassBtnClick()'>Change Password</button>


<input id="login"/>
<button id="loginBtn" "Button" onclick='loginBtnClick()'>Login</button>


<script>
    if(!localStorage.getItem('password')){
      localStorage.setItem('password', 'pass');
    }

    function changePassBtnClick(){
      localStorage.setItem('password', document.getElementById('changePass').value);
      alert('Password changed');
    }
    </script>