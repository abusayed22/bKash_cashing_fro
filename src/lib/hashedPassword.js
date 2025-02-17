
import bcrypt from 'bcrypt';

export const hashedPassword = async(password) => {
    try {
        const setRounds = 10;
        const hashingPassword = await bcrypt.hash(password,setRounds);
        return hashingPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}