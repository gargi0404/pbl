const db = require('../config/db');
const natural = require('natural');
const metaphone = natural.Metaphone;
const JaroWinklerDistance = natural.JaroWinklerDistance;

class PersonModel {
    static async addPerson(personData) {
        const { name, age, gender, address, phone, email, occupation, image_path } = personData;
        const query = 'INSERT INTO persons (name, age, gender, address, phone, email, occupation, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [name, age, gender, address, phone, email, occupation, image_path]);
        return result.insertId;
    }

    static async searchByName(query) {
        const searchQuery = 'SELECT * FROM persons';
        const [persons] = await db.execute(searchQuery);
        
        return persons.filter(person => {
            const jaroDistance = JaroWinklerDistance(query.toLowerCase(), person.name.toLowerCase());
            const metaphoneMatch = metaphone.compare(query, person.name);
            
            return jaroDistance > 0.8 || metaphoneMatch;
        });
    }

    static async getPersonById(id) {
        const query = 'SELECT * FROM persons WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }
}

module.exports = PersonModel; 