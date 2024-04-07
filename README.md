
## Methodology

The Classification and Regression Trees (CART) algorithm is a pivotal machine learning method used for both classification and regression tasks. It constructs binary trees from the training data, splitting the dataset into subsets, which then continue to split recursively until a stop criterion is met. The simplicity of the decision trees makes them highly interpretable and applicable to various tasks, including medical diagnoses, financial forecasting, and more. This detailed explanation will cover the core components of the CART algorithm: the Gini impurity splitting criterion, tree construction, and pruning techniques.


The Classification and Regression Trees (CART) algorithm is a pivotal machine learning method used for both classification and regression tasks. It constructs binary trees from the training data, splitting the dataset into subsets, which then continue to split recursively until a stop criterion is met. The simplicity of the decision trees makes them highly interpretable and applicable to various tasks, including medical diagnoses, financial forecasting, and more. This detailed explanation will cover the core components of the CART algorithm: the Gini impurity splitting criterion, tree construction, and pruning techniques.

Gini impurity is a measure used by the CART algorithm to quantify the disorder or impurity in a set of elements. It is used to decide how to split the data at each step in the tree. The Gini Impurity, \(I_G\), for a set of items with \(J\) classes can be calculated as:
$$
I_G(p) = 1 - \sum_{j=1}^{J} p_j^2
$$
where (pj) is the proportion of items labeled with class \(j\) in the set. The equation sums the squared proportion of each class in the set and subtracts the sum from 1. A Gini Impurity of 0 indicates that the set is perfectly homogeneous, meaning all elements belong to a single class. Higher Gini scores indicate greater disorder, with the maximum value being 1 - 1/j, when items are evenly distributed across all classes.

The CART algorithm builds a binary tree from the training dataset. Starting with the root node, which contains the entire dataset, it iteratively splits the data based on the feature and split-point that result in the maximum reduction of Gini impurity. This process is represented mathematically as selecting the feature \(f\) and split point \(s\) that maximize the decrease in Gini impurity:
$$
\Delta I_G(f, s) = I_G(parent) - \left(\frac{N_{left}}{N} I_G(left) + \frac{N_{right}}{N} I_G(right)\right)
$$
where:
-   IG(parent) is the Gini impurity of the parent node before the split,
-   Nleft and Nright are the no. of samples in the left and right subsets created by the split,
-   IG(left) and IG(right) are the Gini impurities of the left and right subsets,
-   and N is the total number of samples at the parent node.

The algorithm continues to split each subset further, choosing the best split at each node in a greedy manner (i.e., making the locally optimal choice at each step) until a stopping criterion is reached, such as a maximum depth of the tree or a minimum number of samples required to split a node.

To prevent overfitting, the CART algorithm employs pruning techniques to trim the fully grown tree. Pruning reduces the size of the tree by removing sections that provide little power to classify instances. One standard method is cost-complexity pruning, which involves finding the subtree that minimizes the cost-complexity measure:

$$
R_\alpha(T) = R(T) + \alpha|\tilde{T}|
$$

where:
-   R(T) is the total misclassification rate of the subtree T 
-   |T| is the number of terminal nodes in T,
-   and α is the complexity parameter that balances the trade-off between the subtree's size and its fit to the training data.

The algorithm finds the optimal α through cross-validation and uses it to prune the tree by recursively replacing a subtree with a leaf node if the replacement results in a lower cost-complexity measure.


### Overview of the Data Collection and Preprocessing Steps

#### 1. **Library Importation**:
```python
import numpy as np
import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
from sklearn import tree
from sklearn import metrics
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
import random
from random import seed
import os
for dirname, _, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        print(os.path.join(dirname, filename))
```
The code begins by importing essential Python libraries:
- `numpy` and `pandas` for data manipulation,
- `matplotlib.pyplot`, `seaborn`, and `plotly.express` for data visualization,
- and `sklearn` for machine learning tasks.

These libraries are the backbone of data analysis, providing tools for handling, analyzing, and visualizing data, as well as implementing machine learning algorithms.

#### 2. **Dataset Loading**:
```python
data = pd.read_csv("../input/breast-cancer-wisconsin-data/data.csv")
```
The dataset is loaded into a Pandas DataFrame from a CSV file. This step converts the structured data file into a DataFrame object, enabling the application of Pandas' powerful data manipulation methods.

#### 3. **Initial Data Inspection**:
```python
data.head()
data.info()
```
<p align="center">
  <img src="https://github.com/sunami09/my-portfolio/assets/66564001/b18f505c-d11a-4a33-8c10-3e990ebbf914" alt="image"/>
</p>
<p align="center">
  <img src="https://github.com/sunami09/my-portfolio/assets/66564001/7920d84d-a726-4105-bd5f-02d71b810a63" alt="image"/>
</p>
<pre>&lt;class 'pandas.core.frame.DataFrame'&gt;
RangeIndex: 569 entries, 0 to 568
Data columns (total 33 columns):
 #   Column                   Non-Null Count  Dtype  
---  ------                   --------------  -----  
 0   id                       569 non-null    int64  
 1   diagnosis                569 non-null    object 
 2   radius_mean              569 non-null    float64
 3   texture_mean             569 non-null    float64
 4   perimeter_mean           569 non-null    float64
 5   area_mean                569 non-null    float64
 6   smoothness_mean          569 non-null    float64
 7   compactness_mean         569 non-null    float64
 8   concavity_mean           569 non-null    float64
 9   concave points_mean      569 non-null    float64
 10  symmetry_mean            569 non-null    float64
 11  fractal_dimension_mean   569 non-null    float64
 12  radius_se                569 non-null    float64
 13  texture_se               569 non-null    float64
 14  perimeter_se             569 non-null    float64
 15  area_se                  569 non-null    float64
 16  smoothness_se            569 non-null    float64
 17  compactness_se           569 non-null    float64
 18  concavity_se             569 non-null    float64
 19  concave points_se        569 non-null    float64
 20  symmetry_se              569 non-null    float64
 21  fractal_dimension_se     569 non-null    float64
 22  radius_worst             569 non-null    float64
 23  texture_worst            569 non-null    float64
 24  perimeter_worst          569 non-null    float64
 25  area_worst               569 non-null    float64
 26  smoothness_worst         569 non-null    float64
 27  compactness_worst        569 non-null    float64
 28  concavity_worst          569 non-null    float64
 29  concave points_worst     569 non-null    float64
 30  symmetry_worst           569 non-null    float64
 31  fractal_dimension_worst  569 non-null    float64
 32  Unnamed: 32              0 non-null      float64
dtypes: float64(31), int64(1), object(1)
memory usage: 146.8+ KB
</pre>

The `head()` method provides a quick glance at the dataset's first few rows, offering insights into the types of data (e.g., numerical, categorical) and potential features of interest. The `info()` method is then used to summarize the dataset, including the total number of entries, the presence of null values, and the data type of each column. Such preliminary inspections are crucial for identifying issues like missing data or incorrect data types that could affect further analysis.

#### 4. **Data Cleaning**:
The script identifies and removes unnecessary columns, such as "Unnamed: 32" and "id," which do not contribute to the analysis. This step simplifies the dataset, focusing attention on relevant features.

#### 5. **Dataset Shape**:
The size of the dataset is displayed, providing an overview of its scale, which is important for understanding the computational resources that may be needed for processing and the potential for statistical analysis.

#### 6. **Null Value Check**:
Checking for null values is crucial in data preprocessing to ensure the integrity of the dataset. Null values can distort predictive modeling and statistical analyses, necessitating either imputation or removal.

#### 7. **Feature Encoding**:
The 'diagnosis' column, representing the target variable, is encoded from categorical ('M' for malignant, 'B' for benign) to numerical values (1 for malignant, 0 for benign). This step is essential for machine learning algorithms that require numerical input.

#### 8. **Correlation Analysis**:
A correlation matrix is generated and visualized to explore the relationships between features. This analysis is instrumental in identifying features that strongly correlate with the target variable, providing insights into potential predictors for the machine learning model. The use of a triangular mask (`np.triu()`) on the heatmap simplifies the visualization by removing redundant information.

### Theoretical Implications of Data Processing

The preprocessing steps outlined above are grounded in both practical necessity and theoretical considerations. Removing irrelevant features and handling missing values cleans the dataset, reducing noise and potential biases that could affect model performance. Encoding categorical variables into numerical formats is a prerequisite for most machine learning algorithms, which typically require numerical input. Finally, correlation analysis not only aids in feature selection by identifying promising predictors but also helps in detecting multicollinearity, where highly correlated predictors can destabilize some models.
