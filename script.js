document.getElementById('customerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  // 这里可以添加代码将数据发送到服务器
  console.log('姓名:', name);
  console.log('电子邮件:', email);
  console.log('电话号码:', phone);
  console.log('留言:', message);

  // 显示确认信息
  document.getElementById('customerForm').style.display = 'none';
  document.getElementById('confirmation').style.display = 'block';
});
