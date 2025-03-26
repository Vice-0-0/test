from flask import Flask, request
from docx import Document
import io
import ftplib
import logging

app = Flask(__name__)

# 配置日志
logging.basicConfig(level=logging.DEBUG)

@app.route('/generate_word', methods=['POST'])  # 确保支持 POST 方法
def generate_word():
    app.logger.debug(f"Request method: {request.method}")
    app.logger.debug(f"Request URL: {request.url}")
    app.logger.debug(f"Request data: {request.form}")
    data = request.form
    # 加载 Word 模板
    doc = Document('template.docx')

    # 替换模板中的占位符
    for paragraph in doc.paragraphs:
        for key, value in data.items():
            if key in paragraph.text:
                paragraph.text = paragraph.text.replace(key, value)

    # 保存修改后的文档到内存中
    file_stream = io.BytesIO()
    doc.save(file_stream)
    file_stream.seek(0)

    # 连接到 FTP 服务器
    ftp = ftplib.FTP('192.168.1.26')
    ftp.login('用户名', '密码')

    # 上传文件
    ftp.storbinary('STOR output.docx', file_stream)

    # 关闭 FTP 连接
    ftp.quit()

    return "文件已成功发送到指定电脑"

if __name__ == '__main__':
    app.run(debug=True)