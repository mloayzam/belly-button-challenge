//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Define the URL for the samples.json file
var url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use D3 to fetch the data
d3.json(url).then(function(apiData) {
  data =apiData


  // Get references to the necessary elements
  var selDataset = d3.select("#selDataset");
  var barChart = d3.select("#bar");

  // Fill the dropdown menu with the IDs of the test subjects
  var subjectIds = data.names;
  subjectIds.forEach(function(id) {
    selDataset.append("option").text(id).property("value", id);
  });

  // Initial bar chart for the first Test Subject ID
  var initialSubjectId = subjectIds[0];
  updateBarChart(initialSubjectId);
});

// Function to update the bar chart based on the selected Test Subject ID
function updateBarChart(subjectId) {
 
  var selectedData = data.samples.find(sample => sample.id === subjectId);

  // Extract necessary arrays from the selected data
  var sampleValues = selectedData.sample_values.slice(0, 10).reverse();
  var otuIds = selectedData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
  var otuLabels = selectedData.otu_labels.slice(0, 10).reverse();

  // Create the horizontal bar chart
  var trace = {
    type: "bar",
    x: sampleValues,
    y: otuIds,
    text: otuLabels,
    orientation: "h"
  };

  var layout = {
    title: `Top 10 OTUs for Test Subject ID ${subjectId}`,
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" }
  };

  Plotly.newPlot("bar", [trace], layout);
}

// Event listener for dropdown menu changes
function optionChanged(selectedSubjectId) {
  updateBarChart(selectedSubjectId);
}





//Create a bubble chart that displays each sample.

var subjectIds;

// Use D3 to fetch the data
d3.json(url).then(function(apiData) {
  // Assign the fetched data to the global variable
  data = apiData;

  // Extract Test Subject IDs
  subjectIds = data.names;

  // Call the function with the initial Test Subject ID
  updateBubbleChart(subjectIds[0]);
});

// Function to update the bubble chart based on the selected Test Subject ID
function updateBubbleChart(subjectId) {
  // Find the selected data based on the Test Subject ID
  var selectedData = data.samples.find(sample => sample.id === subjectId);

  // Extract necessary arrays from the selected data
  var otuIds = selectedData.otu_ids;
  var sampleValues = selectedData.sample_values;
  var otuLabels = selectedData.otu_labels;

  // Create the bubble chart
  var trace = {
    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
      size: sampleValues,
      color: otuIds,
      colorscale: 'Earth' 
    }
  };

  var layout = {
    title: `Bubble Chart for Test Subject ID ${subjectId}`,
    xaxis: { title: 'OTU IDs' },
    yaxis: { title: 'Sample Values' }
  };

  Plotly.newPlot('bubble', [trace], layout);
}

// Call the function with the initial Test Subject ID
updateBubbleChart(subjectIds[0]);




// Display the sample metadata, i.e., an individual's demographic information.
//Display each key-value pair from the metadata JSON object somewhere on the page.
//Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. 

var subjectIds;

// Use D3 to fetch the data
d3.json(url).then(function(apiData) {
  // Assign the fetched data to the global variable
  data = apiData;

  // Extract Test Subject IDs
  subjectIds = data.names;

  // Populate the dropdown menu with Test Subject IDs
  var selDataset = d3.select("#selDataset");
  subjectIds.forEach(function(id) {
    selDataset.append("option").text(id).property("value", id);
  });

  // Display the initial data for the first Test Subject ID
  updateBarChart(subjectIds[0]);
  updateBubbleChart(subjectIds[0]);
  displaySampleMetadata(subjectIds[0]);
});

// Function to display sample metadata based on the selected Test Subject ID
function displaySampleMetadata(subjectId) {
  // Find the selected metadata based on the Test Subject ID
  var selectedMetadata = data.metadata.find(metadata => metadata.id == subjectId);

  // Select the sample-metadata div and clear any existing content
  var sampleMetadataDiv = d3.select("#sample-metadata");
  sampleMetadataDiv.html("");

  // Iterate through the metadata and append key-value pairs to the div
  Object.entries(selectedMetadata).forEach(([key, value]) => {
    sampleMetadataDiv.append("p").text(`${key}: ${value}`);
  });
}

// Event listener for dropdown menu changes
function optionChanged(selectedSubjectId) {
  updateBarChart(selectedSubjectId);
  updateBubbleChart(selectedSubjectId);
  displaySampleMetadata(selectedSubjectId);
}