'use strict';

const { Contract} = require('fabric-contract-api');

class messContract extends Contract {

async viewBalanceFees(ctx,studentId) {

    let balanceFee = await ctx.stub.getState(studentId); 

    if (!balanceFee|| balanceFee.toString().length <= 0) {

      throw new Error('Student with this Id does not exist: ');

       }

      let fees=JSON.parse(balanceFee.toString());
      return JSON.stringify(fees);

  }

async payFee(ctx,studentId,fees) {
   
   let studentFees=fees;

    await ctx.stub.putState(studentId,Buffer.from(JSON.stringify(studentFees))); 

    console.log('student fees paid Succesfully..');
    
  }

async markAttendance(ctx,studentId) {
   
    let balanceFee = await ctx.stub.getState(studentId); 
    balanceFee=balanceFee-80;
	await ctx.stub.putState(studentId,Buffer.from(JSON.stringify(balanceFee))); 
    console.log('attendance marked , fees deducted Succesfully..');

    }
	
}
