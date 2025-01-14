from app import db


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    occupation = db.Column(db.String(50), nullable=False)
    address = db.Column(db.Text, nullable=False)
    gender = db.Column(db.String(10), nullable=True)
    img_url = db.Column(db.String(200), nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "occupation": self.occupation,
            "address": self.address,
            "gender": self.gender,
            "imgUrl": self.img_url,
        }
