'use strict'
const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })

const preconfdynamo = new AWS.DynamoDB()
const dynamodb = new AWS.DynamoDB.DocumentClient({ service: preconfdynamo })
const sts = new AWS.STS()

module.exports.getPreferencesForUser = async (event, context, newboi) => {
  let parameters = {
    RoleArn: 'arn:aws:iam::288739247229:role/pineapplepad-admins',
    RoleSessionName: 'serverlessfunction',
    WebIdentityToken: event.headers['x-amz-security-token']
  }

  try {
    let creds = await sts.assumeRoleWithWebIdentity(parameters).promise()
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        creds,
        parameters,
        context
      })
    }

    let queryParams = {
      TableName: 'accountattributes'
    }
    let attributes
    attributes = await dynamodb.scan(queryParams).promise()
    console.log(attributes)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        attributes
      })
    }
  } catch (err) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        err,
        parameters,
        context,
        newboi
      })
    }
  }
}
