<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit(onSubmit)">
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
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import { useForm} from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const { handleSubmit,values, errors ,defineField } = useForm({
  validationSchema:schema,
    initialValues: {
      email: '',
      password: ''
    }
});
const [email, emailAttrs] = defineField('email');
const [password,passwordAttrs] = defineField('password');

const onSubmit = () => {
  // Simulate a login action
  // console.log(emailAttrs.value);
  console.log("jegbj");
  alert(`Logged in with Email: ${values.email} and Password: ${values.password}`);
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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