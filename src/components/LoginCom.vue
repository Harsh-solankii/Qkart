<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
          v-bind="emailAttrs"
        />
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          v-bind="passwordAttrs"
        />
        <span v-if="errors.password">{{ errors.password }}</span>
      </div>
      
      <button type="submit">Login</button>
    </form>
    <br>
    <router-link to="/forgot-password">
      Forgot Password ?
    </router-link>
    <br>
    <br>
    <br>
    <router-link to="/register">
       Want to  Register?
    </router-link>
    <p style="color: red;font-size: 16px;">{{ mainerror }}</p>
  </div>
</template>

<script setup lang="ts">
import { useForm} from 'vee-validate';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

const { handleSubmit,errors,defineField} = useForm({
  validationSchema:schema,
    initialValues: {
      email: '',
      password: ''
    }
});
const [email, emailAttrs] = defineField('email');
const [password,passwordAttrs] = defineField('password');

const router = useRouter();

const mainerror = ref();

const onSubmit = handleSubmit(async(values) => {
    let data:any = await fetch("https://qkart-vue-nest.vercel.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });  

    data = await data.json();

    if(data.statusCode === 200){
      localStorage.setItem('id',data.userid);
      localStorage.setItem('token',data.access_token);
      router.push('/home');
    }else{
      mainerror.value = data.message;
    }
});

onMounted(()=>{
  localStorage.clear();
})

</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 93%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

span {
  color: red;
  font-size: 12px;
}
</style>