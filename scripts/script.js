const seats = document.querySelectorAll('.seat');
const sc = document.querySelector('#seat-count')
const all_seats = document.querySelector('#all_seats')
const total_price = document.querySelector('#total_price') 
const grand_total = document.querySelector('#grand_total')
const coupon = document.querySelector('#coupon')
const coupon_msg = document.querySelector('#coupon_msg')
const apply_coupon = document.querySelector('#apply_coupon')
const discount_price = document.querySelector('#discount_price')
const total_seats_show = document.querySelector('#total_seats')
const error_toast = document.querySelector('#error-toast')
const box = document.querySelector('#box')


const name = document.querySelector("#name")
const phone = document.querySelector('#phone')
const email = document.querySelector('#email')
const next = document.querySelector('#next')

const modal = document.querySelector('#modal')
const continue_btn = document.querySelector('#continue')

let selected_seats =[]
let total_seats = 40

seats.forEach(function(seat) {
    seat.addEventListener('click', function(e){
        classList = Object.values(this.classList)

        if(classList.includes('bg-[#1DD100]')) {
            this.classList.remove('bg-[#1DD100]')
            this.classList.remove('text-white')
            this.classList.add('bg-[#F7F8F8]')
            deleteSeat(this.id)
            coupon_msg.innerHTML = ""
            coupon.value = ""
            total_seats++
        }

        if(selected_seats.length < 4 && !classList.includes('bg-[#1DD100]')) {
            this.classList.remove('bg-[#F7F8F8]')
            this.classList.add('bg-[#1DD100]')
            this.classList.add('text-white')
            selected_seats.push({seatName: this.id, class:'Economy', price: 550})
            coupon_msg.innerHTML = ""
            coupon.value = ""
            total_seats--
        } else if(selected_seats.length > 3) {
            error_toast.classList.remove("hidden")
            setTimeout(function(){ error_toast.classList.add('hidden')}, 3000)
        }

        if(selected_seats.length===4) {
            apply_coupon.classList.remove('btn-disabled')
            box.classList.remove('bg-[#D5D6D9]')
            box.classList.add('bg-[#FFFF]')
            coupon.classList.remove('bg-[#D5D6D9]')
            coupon.classList.add('bg-[#FFFF]')
            coupon.disabled = false
        } else if(selected_seats.length < 4 && box.classList.contains('bg-[#FFFF]')){
            apply_coupon.classList.add('btn-disabled')
            box.classList.add('bg-[#D5D6D9]')
            box.classList.remove('bg-[#FFFF]')
            coupon.classList.add('bg-[#D5D6D9]')
            coupon.classList.remove('bg-[#FFFF]')
            coupon.disabled = true

        }

        sc.innerText = selected_seats.length
        total_seats_show.innerText = total_seats
        updateDOMSeat(selected_seats)
        totalPrice(selected_seats)
        checkNextButtonAvailability(phone.value, selected_seats)
    })
})


// coupon apply
apply_coupon.addEventListener('click', function(e) {
    console.log('Clicked!')
    if(coupon.value == "New15") {
        totalPrice(selected_seats, 15)
        box.innerHTML = `<div class="font-bold font-inter bg-[#27AE60] p-3 rounded-xl text-white">Coupon Applied! You got 15% OFF!</div>`
    } else if(coupon.value == "Couple 20") {
        totalPrice(selected_seats, 20)
        box.innerHTML = `<div class="font-bold font-inter bg-[#27AE60] p-3 rounded-xl text-white">Coupon Applied! You got 20% OFF!</div>`
    } else{
        coupon_msg.innerHTML = `<div class="font-bold font-inter text-red-500">Invalid Coupon!</div>`
    }
})


phone.addEventListener("input", function(e){
    checkNextButtonAvailability(phone.value, selected_seats)
})


next.addEventListener('click', function(e) {
    modal.classList.contains('hidden') ?
        modal.classList.remove('hidden') : modal.classList.add('hidden')
})

continue_btn.addEventListener('click', function(e) {
    modal.classList.add('hidden')
})

function deleteSeat(seat) {
    selected_seats = selected_seats.filter(function(s) {
        return s.seatName != seat
    })
}

function totalPrice(seats, discount=0) {
    let total = 0;
    seats.forEach(function(seat) {
        total += seat.price
    })
    total_price.innerText = `BDT ${total}`
    grand_total.innerText = `BDT ${total - (total*(discount/100))}`
    if(discount!=0) {
        discount_price.innerHTML = `
        <div class="font-inter font-bold">Discount Price</div>
        <div id="grand_total" class="font-inter font-bold">${(total*(discount/100))}</div>
        `
    }
}

function updateDOMSeat(seats) {
    all_seats.innerHTML = ''
    if(seats.length === 0) {
        all_seats.innerHTML = `<div class="font-bold font-inter text-center py-5 text-orange-500">No seat is selected yet!</div>`
    }
    seats.forEach(function(seat) {
        all_seats.innerHTML += `
        <div class="flex justify-between">
            <div class="text-[#03071299] font-inter">${seat.seatName}</div>
            <div class="text-[#03071299] font-inter">${seat.class}</div>
            <div class="text-[#03071299] font-inter">${seat.price}</div>
        </div>
        `
    })
}   


function checkNextButtonAvailability(inputVal, seats){
    if(inputVal.length > 0 && seats.length>0){
        next.classList.remove('btn-disabled')
    } else if((seats.length<=0 ||  inputVal.length <=0) && !next.classList.contains('btn-disabled')) {
        next.classList.add('btn-disabled')
    }
}
