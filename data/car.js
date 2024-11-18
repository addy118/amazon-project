class Car {
  #brand;
  #model;
  speed = 0;
  maxSpeed = 200;
  isTrunkOpen = false;

  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
  }

  getBrand() {
    return this.#brand;
  }

  getModel() {
    return this.#model;
  }

  displayInfo() {
    console.log(
      `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk is ${this.isTrunkOpen === true ? "opened" : "closed"}`
    );
  }

  go() {
    if (this.isTrunkOpen === true) {
      this.displayInfo();
      return;
    }

    this.speed += 5;
    if (this.speed > this.maxSpeed) {
      this.speed -= 5;
    }
    this.displayInfo();
  }

  brake() {
    this.speed -= 5;
    if (this.speed < 0) {
      this.speed += 5;
    }
    this.displayInfo();
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
    this.displayInfo();
  }

  closeTrunk() {
    this.isTrunkOpen = false;
    this.displayInfo();
  }
}

class RaceCar extends Car {
  acceleration;
  maxSpeed = 300;

  constructor(brand, model, acceleration) {
    super(brand, model);
    this.acceleration = acceleration;
  }

  displayInfo() {
    console.log(
      `${this.getBrand()} ${this.getModel()}, Speed: ${this.speed} km/h`
    );
  }

  openTrunk() {
    return console.log("No Trunk");
  }

  closeTrunk() {
    return console.log("No Trunk");
  }

  go() {
    this.speed += this.acceleration;
    if (this.speed > this.maxSpeed) {
      this.speed -= this.acceleration;
    }
    this.displayInfo();
  }

  brake() {
    this.speed -= this.acceleration;
    if (this.speed < 0) {
      this.speed += this.acceleration;
    }
    this.displayInfo();
  }
}

const car1 = new Car("Toyota", "Corolla");

const car2 = new Car("Tesla", "Model 3");

const raceCar1 = new RaceCar("McLaren", "F1", 20);

car2.go();
car2.go();
car1.brake();
car1.openTrunk();
car2.openTrunk();
car1.go();
raceCar1.brake();
raceCar1.brake();
