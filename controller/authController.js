const bcrypt = require("bcrypt");
const user = require("../models/userModel");

// stunum INT PRIMARY KEY,
// username VARCHAR(50) NOT NULL UNIQUE,
// password VARCHAR(255) NOT NULL

exports.register = async (req, res) => {
    try {
        const { stunum, username, password,role } = req.body;

        if (!stunum || !username || !password || !role) {
            return res.send("<script>값을 입력해주세요</script>");
        }

        const existing = await user.findByUsername(username);
        //같은 이름은 김강민(2), 김강민(4)로 적어서 구분, 로그인 페이지에서 표시
        if (existing) {
            return res
                .status(409)
                .json({ message: "이미 등록된 사용자입니다." });
        }

        const hashed = await bcrypt.hash(password, 10);

        await user.createUser(stunum, username, hashed);

        return res.status(201).json({ message: "회원가입 성공" });
    } catch (err) {
        next(err)
    }
};

exports.login = async (req, res) => {
    try {
        const { stunum, username, password } = req.body;

        if (!stunum || !username || !password) {
            return res.send("<script>값을 입력해주세요</script>");
        }

        const existing = await user.findByUsername(username);
        if (!existing) {
            return res
                .status(409)
                .json({ message: "사용자를 찾을 수 없습니다." });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res
                .status(409)
                .json({ message: "비밀번호가 일치하지 않습니다." });

        req.session.username = existing.username;
        req.session.stunum = existing.stunum;

        



        return res.status(409).json({ message: "로그인 성공", token });
    } catch (err) {
        next(err)
    }
};
const bcrypt = require("bcrypt");
const user = require("../models/userModel");

exports.register = async (req, res, next) => {
    try {
        const { stunum, username, password, role } = req.body;

        if (!stunum || !username || !password || !role) {
            return res.send("<script>alert('값을 입력해주세요'); history.back();</script>");
        }

        const existing = await user.findByUsername(username);
        if (existing) {
            return res.status(409).json({ message: "이미 등록된 사용자입니다." });
        }

        const hashed = await bcrypt.hash(password, 10);

        await user.createUser(stunum, username, hashed, role);

        return res.status(201).json({ message: "회원가입 성공" });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { stunum, username, password } = req.body;

        if (!stunum || !username || !password) {
            return res.send("<script>alert('값을 입력해주세요'); history.back();</script>");
        }

        const existing = await user.findByUsername(username);
        if (!existing) {
            return res.status(409).json({ message: "사용자를 찾을 수 없습니다." });
        }

        if (existing.stunum !== Number(stunum)) {
            return res.status(409).json({ message: "학번이 일치하지 않습니다." });
        }

        const match = await bcrypt.compare(password, existing.password);

        if (!match) {
            return res.status(409).json({ message: "비밀번호가 일치하지 않습니다." });
        }

        req.session.username = existing.username;
        req.session.stunum = existing.stunum;

        return res.status(200).json({ message: "로그인 성공" });
    } catch (err) {
        next(err);
    }
};
///