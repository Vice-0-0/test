from flask import Flask, request, send_file
from docx import Document
import io
import ftplib
import logging

app = Flask(__name__)

# 配置日志
logging.basicConfig(level=logging.DEBUG)

@app.route('/generate_word', methods=['GET', 'POST'])
def generate_word():
    if request.method == 'GET':
        data = request.args
    else:
        data = request.form
    
    app.logger.debug(f"Received request data: {data}")  # 打印接收到的表单数据
    
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

    # 返回文件供用户下载
    return send_file(
        file_stream,
        as_attachment=True,
        download_name='output.docx',
        mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )

if __name__ == '__main__':
    app.run(debug=True)