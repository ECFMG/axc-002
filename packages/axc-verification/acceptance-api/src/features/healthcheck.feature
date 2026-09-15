Feature: API healthcheck
  As an operator
  I want GET /health to report service status
  So that I can confirm agentCourses-api is running

  Scenario: Healthcheck returns the published contract
    When a client requests GET /health
    Then the response status is 200
    And the response body field "status" is "ok"
    And the response body field "service" is "agentCourses-api"
    And the response body field "projectCode" is "axc"
    And the environment is one of local, test, production
    And timestamp is an ISO-8601 string
