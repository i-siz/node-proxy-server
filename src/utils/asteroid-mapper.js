const getAverageValue = (array) => array.reduce((a, b) => a + b, 0) / array.length;

const mapAsteroidsData = (asteroidsData) => ({
    meteors: Object.entries(asteroidsData.near_earth_objects)
        .sort((a, b) => Date.parse(a[0]) - Date.parse(b[0]))
        .map(([date, asteroidsInADay]) => ({
            [date]: asteroidsInADay.map((asteroidInfo) => {
                const { id, name, estimated_diameter, is_potentially_hazardous_asteroid, close_approach_data } = asteroidInfo;
                const { estimated_diameter_min, estimated_diameter_max } = estimated_diameter.meters;
                const { close_approach_date_full, relative_velocity } = close_approach_data[0];
                return {
                    id,
                    name,
                    average_diameter_in_meters: getAverageValue([estimated_diameter_min, estimated_diameter_max]),
                    is_potentially_hazardous_asteroid,
                    close_approach_date_full,
                    relative_velocity_in_kilometers_per_second: relative_velocity.kilometers_per_second
                }
            })
        }))
})

module.exports = {
    mapAsteroidsData,
};