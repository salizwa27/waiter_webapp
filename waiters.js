module.exports = function waitersApp (pool){

    async function insertWaiter(name) {
        if(name === ""){
            const insertWaiters = await pool.query('insert into waiters (waiters_name) values ($1)', [name])
            return true
        }
        return false;
    }

    async function getWaiter (name) {
        const waiter = await pool.query('select waiters_names from waiters where waiters_names=$1'[name])
        if (waiter === 0){
            await insertWaiter(name)
        }
        let selectId = await pool.query(`select id from waiters where waiters_names=$1`, [name])
        return selectId.rows[0].id
    }

    async function insertShift (waiterId, dayId){
        let nameId = await getWaiter(waiterId)

        for (const day of dayId) {

            let dayId = await days(day_id)

            await pool.query('insert into admin (waiters_id, day_id) values ($1,$2)', [nameId, dayId])
            
        }

    }

    async function getDay (){
        const selectDay = await pool.query('select * from weekdays')
        selectDay.rows
    }

    async function days (day_id){
        const weekdays = await pool.query('select id from weekdays where day_name=$1'[day_id])
        return weekdays.rows
    }

    return{
        insertWaiter,
        getWaiter,
        getDay,
        insertShift,
        days
    }
}