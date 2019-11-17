const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const dateTime = () => {
    const dateString = new Date().toLocaleString();
    const dateArray = dateString.split(',')[0].split('.')
    dateArray[1] = monthNames[Number(dateArray[1]) - 1]
    const date = dateArray.join(' ')
    const time = dateString.split(',')[1].split(':')
    time.splice(time.length - 1, 1)
    return time.join(':') + ' ' + date
}