const pool = require('../config/db')


// notice_id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     content TEXT NOT NULL,
//     author_stunum INT NOT NULL,
//     post_date DATETIME DEFAULT CURRENT_TIMESTAMP,
//     is_pinned BOOLEAN DEFAULT FALSE,
//     FOREIGN KEY (author_stunum) REFERENCES users(stunum)




async function createNotice() {
    const sql = 'insert into notices (title,content,)'

}